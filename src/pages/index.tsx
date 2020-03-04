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

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

// const Home: NextPage<PageProps> = (props: PageProps): JSX.Element => {
//   const {
//     gcmsLocales,
//     dataProvider,
//   }: PageProps = props;
//
//   console.log('dataProvider', dataProvider)
//
//   if (!isBrowser()) {
//     return <Loader />;
//   }
//
//   return (
//     <Admin title="Ne" dataProvider={dataProvider}>
//       <Resource name="Product" list={ListGuesser} />
//     </Admin>
//   );
//
// };

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: null,
    };
  }

  componentDidMount() {
    const httpLink = createHttpLink({
      uri: 'https://api-euwest.graphcms.com/v1/ck73ixhlv09yt01dv2ga1bkbp/master',
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjoyLCJ0b2tlbklkIjoiMGEyZWYwZWYtYmY4Ny00ZmVlLTkzYmQtMzBkMzIzYzAwODM4IiwiaWF0IjoxNTgyNzQ2MDc1LCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyJ9.wE-IDwFnCNpwUj5AMeGsbf2CGcTgkT1KkE9_l6s-bU03sckdDgV2LXCHH5Fb8XwJGAkoeD5bK9yDnY6oNapiusvg4xRqY-hkRxgh8lB_lTXXpIka6HhjIJz1RQO_dObNGFqr41dKihseBqN5Ce4AJvQBIHyJasKX63xe2eEzdUnWfuNUmrG_XStRu1-xDKKp7vFVox272rr-LqgwRymF3eYcw7J-IAag4qpztoU6zNhKJNYzQKdMMejvMDNg34bHNp4TRIbIUIYpytkwCaAb5TsH98xEiFziU5rUr4EYToSltgE46VnqX2npm56qK-AGp5zauMZgvA20Djtb7BuYqGAqCdOHEQtjjyVLufCu6Y72i9gNQqFQ-WGQ6AFN84KT7BJgRoTruduYG9VhGMOR59HR3jG2QIWXOCt55aI9YwAGNQii0b_QqaoSO08Pb_Ooji5abFLISs70jQb-z1QcnvHIzHnsKqymEWwZhbkxpwf8bv8C6-8k4JGB5YdVj3T_0XQ-OCyvWQIGwVxKysLj8HBeVvXOKUyz7p-thOHbO4qSaRaV7w6_Yy2XtdwBlkIiTTqLezN34vCnsyhZ7N1IgLzp0bwNCyCoPOFs5Q9Ccw7hwJRP3kDT2cW4COJWVt-V5YF_9nnlZN8JjcIgv7FMZKoKRHi004vSosPYGd-v3Uw';
      // return the headers to the context so httpLink can read them
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

    buildGraphQLProvider({
      client,
      // @ts-ignore
    }).then((dataProvider) => this.setState({ dataProvider }));
  }

  render() {
    // @ts-ignore
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin title="Prisma e-commerce" dataProvider={dataProvider}>
        <Resource name="Product" list={ProductList} />
      </Admin>
    );
  }
}

export default Home;
