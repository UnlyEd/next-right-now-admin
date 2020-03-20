import React from 'react';
import { Admin, Resource } from 'react-admin';
import { NRN_DEFAULT_SERVICE_LABEL } from '../../constants';
import CustomerEdit from './CustomerEdit';
import CustomerList from './CustomerList';

import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import ProductList from './ProductList';
import ProductShow from './ProductShow';

const AdminContainer = (props: Props): JSX.Element => {
  console.debug('AdminContainer.props', props);
  const { dataProvider } = props;

  return (
    <Admin
      title={NRN_DEFAULT_SERVICE_LABEL}
      dataProvider={dataProvider}
    >
      <Resource name="Customer" list={CustomerList} edit={CustomerEdit} />
      <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate} show={ProductShow} />
      <Resource name="Theme" />
      <Resource name="Asset" />
    </Admin>
  );
};

type Props = {
  dataProvider: any;
}

export default AdminContainer;
