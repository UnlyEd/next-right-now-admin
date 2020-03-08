import { GET_LIST, GET_ONE } from 'react-admin';
import { product } from '../gql/fragments/product';

export default {
  Product: {
    [GET_LIST]: product.productFields,
    [GET_ONE]: product.productFields,
  },
};
