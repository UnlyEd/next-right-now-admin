import { GET_LIST } from 'react-admin';
import gql from 'graphql-tag';

export default {
  Product: {
    [GET_LIST]: gql`
      fragment product on Product {
        id
        title
        titleFR: title(locale: FR)
        titleEN: title(locale: EN)
#        description: description(locale: FR)
#        descriptionFR: description(locale: FR)
        price
        customer {
          label
        }
        images {
          id
          url
          height
          width
          fileName
        }
      }
    `
  },
};
