/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import get from 'lodash.get';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-prisma';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import { ProductEdit } from '../components/admin/ProductEdit';
import { ProductList } from '../components/admin/ProductList';
import Head from '../components/Head';
import Loader from '../components/Loader';
import overriddenQueries from '../queries';
import { GraphQLDataProvider } from '../types/GraphQLDataProvider';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const enhanceBuildQuery = (buildQuery) => (introspectionResults) => (
  fetchType,
  resourceName,
  params,
) => {
  const fragment = get(overriddenQueries, `${resourceName}.${fetchType}`);
  console.log('fragment', fragment);
  console.log('fetchType', fetchType);
  console.log('resourceName', resourceName);
  console.log('params', params);

  return buildQuery(introspectionResults)(
    fetchType,
    resourceName,
    params,
    fragment,
  );
};

class Home extends Component<{}, {
  dataProvider: GraphQLDataProvider;
}> {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: null,
    };
  }

  async componentDidMount(): Promise<void> {
    const httpLink = createHttpLink({
      uri: process.env.GRAPHQL_API_ENDPOINT,
    });

    const authLink = setContext((_, { headers }) => {
      const token = process.env.GRAPHQL_API_KEY || null;

      // Return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null,
        },
      };
    });
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    const dataProvider = await buildGraphQLProvider({
      client,
      // @ts-ignore
      buildQuery: enhanceBuildQuery(buildQuery),
    });
    this.setState({
      dataProvider,
    });
  }

  render(): JSX.Element {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <Loader />;
    }

    return (
      <Amplitude
        eventProperties={(inheritedProps): object => ({
          ...inheritedProps,
          page: {
            ...inheritedProps.page,
            name: 'index',
          },
        })}
      >
        {({ logEvent }): JSX.Element => (
          <>
            <LogOnMount eventType="page-displayed" />
            <Head />
            <Admin
              title="Next Right Now - Admin"
              dataProvider={dataProvider}
            >
              <Resource name="Product" list={ProductList} edit={ProductEdit} />
            </Admin>
          </>
        )}
      </Amplitude>
    );
  }
}

export default Home;
