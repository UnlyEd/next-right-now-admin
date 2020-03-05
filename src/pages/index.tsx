import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { isBrowser } from '@unly/utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import Head from '../components/Head';
import Loader from '../components/Loader';
import { AppPageProps } from '../types/AppPageProps';

const Home = (props: AppPageProps): JSX.Element => {
  if (!isBrowser()) {
    return <Loader />;
  }

  // XXX Not compatible with SSR, must be imported on the client only
  const { HydraAdmin } = require('@api-platform/admin');

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
          <HydraAdmin
            entrypoint={process.env.GRAPHQL_API_ENDPOINT}
          />
        </>
      )}
    </Amplitude>
  );
};

export default Home;
