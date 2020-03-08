/**
 * Defined in node_modules/ra-data-graphql-prisma/src/buildQuery.ts
 * But aren't defined/exported and must be re-declared here to be usable in our project
 */
import { DocumentNode } from 'graphql';

// TODO Types aren't completely defined, to improve
export type BuiltQuery = {
  query: DocumentNode;
  variables: {
    where?: object;
  };
  parseResponse: Function;
}
