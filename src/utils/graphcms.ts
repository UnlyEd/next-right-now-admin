import { diff, DiffEdit } from 'deep-diff';
import { FieldNode, IntrospectionField } from 'graphql';
import { print } from 'graphql/language/printer';
import endsWith from 'lodash.endswith';
import get from 'lodash.get';
import includes from 'lodash.includes';
import map from 'lodash.map';
import { IntrospectionResult } from 'ra-data-graphql-prisma/src/constants/interfaces';
import { CREATE, UPDATE } from 'react-admin';

import overriddenQueries from '../queries';

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
 * See https://github.com/marcantoine/ra-data-graphql-prisma/pull/12#issuecomment-596074907
 *
 * @param field
 * @param key Field name
 * @param acc Accumulator
 * @param introspectionResults
 */
export const fieldLookup = (
  field: IntrospectionField,
  key: string,
  acc: FieldNode[],
  introspectionResults: IntrospectionResult,
): string => {
  if (isLocalisedField(key)) {
    return getLocalisedFieldAlias(key);
  }
  return key;
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
export const sanitizeMutationUpdateData = (data: object, previousData: object): object => {
  const sanitizedData = {};

  // Always remove createdAt, updatedAt, id, because they shouldn't be updated
  const blackListedFields = [
    'id',
    'createdAt',
    'updatedAt',
  ];

  const changes = diff(previousData, data);

  map(changes, (change: DiffEdit<object>) => {
    const fieldName: string = change.path[0];

    if (!includes(blackListedFields, fieldName)) {
      sanitizedData[fieldName] = change.rhs;
    }
  });

  return sanitizedData;
};

/**
 * Wrapper around the native ra-data-graphql-prisma "buildQuery" function.
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
export const enhanceBuildQuery = (buildQuery) => (introspectionResults) => (
  fetchType,
  resourceName,
  params,
) => {
  const fragment = get(overriddenQueries, `${resourceName}.${fetchType}`);
  console.log('fragment', fragment);
  console.log('fetchType', fetchType);
  console.log('resourceName', resourceName);
  console.log('initial params', params);

  switch (fetchType) {
    case UPDATE:
      const { data, previousData } = params;

      // Override data by removing all non-updated and blacklisted fields
      params.data = sanitizeMutationUpdateData(data, previousData);
      break;
    case CREATE:

      break;

    default:
      break;
  }

  const builtQuery = buildQuery(introspectionResults, fieldLookup)(
    fetchType,
    resourceName,
    params,
    fragment,
  );

  console.log('builtQuery', builtQuery);
  console.debug(print(builtQuery.query), builtQuery.variables);

  return builtQuery;
};
