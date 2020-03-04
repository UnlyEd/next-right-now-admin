/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import get from 'lodash.get';
import buildGraphQLProvider, { buildQuery } from 'ra-data-opencrud';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { Component } from 'react';
import { Admin, ListGuesser, Resource } from 'react-admin';

import overriddenQueries from '../queries';

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

const enhanceBuildQuery = (buildQuery) => (introspectionResults) => (
  fetchType,
  resourceName,
  params,
) => {
  const fragment = get(overriddenQueries, `${resourceName}.${fetchType}`);

  return buildQuery(introspectionResults)(
    fetchType,
    resourceName,
    params,
    fragment,
  );
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: null,
    };
  }

  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: {
        // @ts-ignore
        uri: 'https://eu1.prisma.sh/flavian/ra-data-prisma/dev',
      },
      buildQuery: enhanceBuildQuery(buildQuery),
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
        <Resource name="Product" list={ListGuesser} />
      </Admin>
    );
  }
}

export default Home;
