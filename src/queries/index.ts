import { GET_LIST } from 'react-admin';
import gql from 'graphql-tag';

export default {
  Product: {
    [GET_LIST]: gql`
      fragment product on Product {
        id
        title: title(locale: FR)
#        description: description(locale: FR)
#        descriptionFR: description(locale: FR) XXX Using this makes the ra-data-opencru/getResponseParser crash when reading "field.type", because "field" doesn't match any known field and thus has no "type" prop
        price
        customer {
          label
        }
      }
    `
  },
};
