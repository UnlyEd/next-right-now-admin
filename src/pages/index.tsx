import { HydraAdmin } from '@api-platform/admin';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import Loader from '../components/Loader';
import { AppPageProps } from '../types/AppPageProps';

const Home = (props: AppPageProps): JSX.Element => {
  const { isServer } = props;

  if (!isServer) {
    return <Loader />;
  }

  return (
    <HydraAdmin entrypoint={'https://demo.api-platform.com'} />
    // <HydraAdmin entrypoint={process.env.GRAPHQL_API_ENDPOINT} />
  );
};

export default Home;
