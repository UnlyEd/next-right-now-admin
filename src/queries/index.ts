import { GET_LIST } from 'react-admin';
import gql from 'graphql-tag';

export default {
  Product: {
    [GET_LIST]: gql`
      fragment product on Product {
        id
        description
      }
    `
  },
};
