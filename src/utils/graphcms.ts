import { IntrospectionResult } from '@unly/ra-data-graphql-prisma/lib/constants/interfaces';
import { diff, DiffEdit } from 'deep-diff';
import { FieldNode, IntrospectionField } from 'graphql';
import { print } from 'graphql/language/printer';
import endsWith from 'lodash.endswith';
import get from 'lodash.get';
import includes from 'lodash.includes';
import map from 'lodash.map';
import { CREATE, UPDATE } from 'react-admin';

import overriddenQueries from '../queries';
import { BuiltQuery } from '../types/BuiltQuery';
import { arrayToNestedObject } from './arrays';
import { Record } from './record';

/**
 * GraphCMS country codes separator expected in the header
 *
 * @see https://graphcms.com/docs/api/content-api/#passing-a-header-flag
 * @type {string}
 */
export const LANGUAGES_SEP = ', ';

/**
 * Convert an array of languages into a GraphCMS-compatible locale header
 * @see https://graphcms.com/docs/api/content-api/#passing-a-header-flag
 *
 * XXX Beware, uppercase is very important as it won't work properly if not upper-cased!
 *
 * @param {string[]} languages
 * @return {string}
 */
export const prepareGraphCMSLocaleHeader = (languages: string[]): string => {
  return languages.join(LANGUAGES_SEP).toUpperCase();
};

/**
 * Resolves whether a GraphQL field is localised
 *
 * Implementation is specific to GraphQL provider
 *
 * TODO Handle any language, we could check if two last chars are upper-cased
 *
 * @example titleFR => true
 * @example titleEN => true
 * @example price => false
 *
 * @param fieldName
 */
export const isLocalisedField = (fieldName: string): boolean => {
  return endsWith(fieldName, 'EN') || endsWith(fieldName, 'FR');
};

/**
 * Remove last 2 chars to get the alias
 *
 * @example titleFR => title
 * @example titleEN => title
 *
 * @param fieldName
 */
export const getLocalisedFieldAlias = (fieldName: string): string => {
  return fieldName.substring(0, fieldName.length - 2);
};

/**
 * Resolve the real field name, even if it is a localised field
 *
 * See https://github.com/marcantoine/@unly/ra-data-graphql-prisma/pull/12#issuecomment-596074907
 *
 * @param field
 * @param fieldName
 * @param acc Accumulator (other fields)
 * @param introspectionResults GraphQL introspection results
 */
export const fieldAliasResolver = (
  field: IntrospectionField,
  fieldName: string,
  acc: FieldNode[],
  introspectionResults: IntrospectionResult,
): string => {
  console.debug('introspectionResults', introspectionResults);
  if (isLocalisedField(fieldName)) {
    return getLocalisedFieldAlias(fieldName);
  }
  return fieldName;
};

/**
 * Sanitize data for a mutation UPDATE operation
 *
 * Remove from "data" all blacklisted fields
 * Remove from "data" all fields that weren't updated (equal to previousData)
 *
 * @param data
 * @param previousData
 */
export const sanitizeMutationUpdateData = (data: Record, previousData: Record): object => {
  let sanitizedData = {
    id: data.id, // The id is required to be converted to a WHERE statement by the query builder
  };

  const changes = diff(previousData, data);

  map(changes, (change: DiffEdit<object>) => {
    if (change.kind === 'E') { // Ignoring diff other than Edit (E)
      const field = arrayToNestedObject(change.path, change.rhs);

      sanitizedData = {
        ...sanitizedData,
        ...field,
      };
    }
  });

  return sanitizedData;
};

export const sanitizeMutationCreateData = (data: Record): object => {
  const sanitizedData = {};

  // Always remove createdAt, updatedAt because they shouldn't be updated
  const blackListedFields = [
    'createdAt',
    'updatedAt',
  ];

  map(data, (value, fieldName) => {
    if (!includes(blackListedFields, fieldName)) {
      sanitizedData[fieldName] = value;
    }
  });

  return sanitizedData;
};

/**
 * Wrapper around the native @unly/ra-data-graphql-prisma "buildQuery" function.
 * We wrap it so that we may override the default behaviour for our actual data provider (GraphCMS)
 *
 * Features:
 *  - I18n support (content localisation)
 *  - Mutations
 *    - UDPATE: Only send updated fields
 *      XXX Required because otherwise it'd send all the record's data, and override them with those that have been updated
 *       But GraphCMS schema won't allow createdAt/updatedAt fields in a mutation, so we only provide updated fields instead
 *    - CREATE: Only send specified values (those for whom there is a field in the form)
 *
 * @param buildQuery
 */
export const enhanceBuildQuery = (buildQuery) => (introspectionResults: IntrospectionResult) => (
  fetchType,
  resourceName,
  params,
): BuiltQuery => {
  const { data } = params;
  const fragment = get(overriddenQueries, `${resourceName}.${fetchType}`);
  // console.log('introspectionResults', introspectionResults);
  console.log('fragment', fragment);
  console.log('fetchType', fetchType);
  console.log('resourceName', resourceName);
  console.log('initial params', JSON.stringify(params, null, 2));

  // Step 1 - Sanitize data so that the generated query/mutation is correct (structure/shape)
  switch (fetchType) {
    case UPDATE:
      const { previousData } = params;

      // Override data by removing all non-updated and blacklisted fields
      params.data = sanitizeMutationUpdateData(data, previousData);
      break;
    case CREATE:

      params.data = sanitizeMutationCreateData(data);

      break;
    default:
      break;
  }

  const builtQuery: BuiltQuery = buildQuery(introspectionResults, fieldAliasResolver)(
    fetchType,
    resourceName,
    params,
    fragment,
  );
  const { query, variables } = builtQuery;

  console.log('builtQuery', builtQuery);
  console.debug(print(query), '- Variables:', variables, ' using params:', params);

  return builtQuery;
};
