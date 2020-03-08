import { FieldNode, IntrospectionField } from 'graphql';
import endsWith from 'lodash.endswith';
import { IntrospectionResult } from 'ra-data-graphql-prisma/dist/constants/interfaces';

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
 * @param key
 * @param acc
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
