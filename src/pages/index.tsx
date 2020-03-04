/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import buildGraphQLProvider from 'ra-data-opencrud';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import { ProductList } from '../components/admin/ProductList';
import Loader from '../components/Loader';
import { GraphQLDataProvider } from '../types/GraphQLDataProvider';

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
      const token = process.env.GRAPHQL_API_KEY || '';

      // Return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    const dataProvider = await buildGraphQLProvider({
      client,
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
      <Admin
        title="Next Right Now - Admin"
        dataProvider={dataProvider}
      >
        <Resource name="Product" list={ProductList} />
      </Admin>
    );
  }
}

export default Home;
