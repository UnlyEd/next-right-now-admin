import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const product = {
  productFields: gql`
    fragment productFields on Product {
      id
      status
      createdAt
      updatedAt
      titleFR: title(locale: FR)
      titleEN: title(locale: EN)
      descriptionFR: description(locale: FR)
      descriptionEN: description(locale: EN)
      price
      customer {
        id
        label
      }
      images {
        id
        url
        title
        height
        width
        fileName
      }
    }
  `,
};
