import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { HydraAdmin } from '@api-platform/admin';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import Head from '../components/Head';
import Loader from '../components/Loader';
import { AppPageProps } from '../types/AppPageProps';

const Home = (props: AppPageProps): JSX.Element => {
  const { isServer } = props;

  if (!isServer) {
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
          <HydraAdmin entrypoint={'https://demo.api-platform.com'} />
          {/*<HydraAdmin entrypoint={process.env.GRAPHQL_API_ENDPOINT} />*/}
        </>
      )}
    </Amplitude>
  );
};

export default Home;
