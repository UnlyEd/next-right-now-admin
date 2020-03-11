/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import buildGraphQLProvider, { buildQuery } from '@unly/ra-data-graphql-prisma';
import { createLogger } from '@unly/utils-simple-logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { Component } from 'react';
import AdminContainer from '../components/admin/AdminContainer';
import Head from '../components/Head';
import Loader from '../components/Loader';
import { GraphQLDataProvider } from '../types/GraphQLDataProvider';
import { enhanceBuildQuery } from '../utils/graphcms';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

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
      buildQuery: enhanceBuildQuery(buildQuery),
      debug: process.env.APP_STAGE !== 'production',
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

            <AdminContainer dataProvider={dataProvider} />
          </>
        )}
      </Amplitude>
    );
  }
}

export default Home;
