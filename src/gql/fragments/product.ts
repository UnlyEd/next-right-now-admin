import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const product = {
  productFields: gql`
    fragment productFields on Product {
      id
      title
      titleFR: title(locale: FR)
      titleEN: title(locale: EN)
      #        description: description(locale: FR)
      #        descriptionFR: description(locale: FR)
      price
      customer {
        id
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
  `,
};
