import { GET_LIST, GET_ONE } from 'react-admin';
import { customer } from '../gql/fragments/customer';
import { product } from '../gql/fragments/product';

export default {
  Customer: {
    [GET_LIST]: customer.customerFields,
    [GET_ONE]: customer.customerFields,
  },
  Product: {
    [GET_LIST]: product.productFields,
    [GET_ONE]: product.productFields,
  },
};
