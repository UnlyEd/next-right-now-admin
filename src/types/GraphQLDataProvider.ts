export type GraphQLDataProvider = (
  fetchType: string,
  resource: string,
  params: { [key: string]: any }
) => Promise<any>;
