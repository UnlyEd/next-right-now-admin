import React from 'react';
import { Admin, Resource } from 'react-admin';
import { NRN_DEFAULT_SERVICE_LABEL } from '../../constants';
import CustomerEdit from './CustomerEdit';
import CustomerList from './CustomerList';

import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import ProductList from './ProductList';

const AdminContainer = (props: Props): JSX.Element => {
  const { dataProvider } = props;

  return (
    <Admin
      title={NRN_DEFAULT_SERVICE_LABEL}
      dataProvider={dataProvider}
    >
      <Resource name="Customer" list={CustomerList} edit={CustomerEdit} />
      <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate} />
    </Admin>
  );
};

type Props = {
  dataProvider: any;
}

export default AdminContainer;
