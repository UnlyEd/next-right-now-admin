import React from 'react';
import { Layout } from 'react-admin';
import AdminAppBar from './AdminAppBar';

// import AdminMenu from './AdminMenu';

const AdminLayout = (props): JSX.Element => {
  console.debug('AdminLayout.props', props);

  return (
    <Layout
      {...props}
      // XXX Importing AdminMenu crashes the app even though I followed official doc at https://marmelab.com/react-admin/doc/3.1/Theming.html#using-a-custom-menu
      //  I guess the official tutorial is out of date...
      // menu={AdminMenu}
      appBar={AdminAppBar}
    />
  );
};

export default AdminLayout;
