/**
 * Defined in node_modules/@unly/ra-data-graphql-prisma/typings.d.ts
 * But aren't exported and must be re-declared here to be usable in our project
 */
export type GraphQLDataProvider = (
  fetchType: string,
  resource: string,
  params: { [key: string]: any }
) => Promise<any>;
