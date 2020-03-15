import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const customer = {
  customerFields: gql`
    fragment customerFields on Customer {
      id
      status
      createdAt
      updatedAt
      ref
      labelFR: label(locale: FR)
      labelEN: label(locale: EN)
      termsEN: terms(locale: EN) {
        html
      }
      termsFR: terms(locale: FR) {
        html
      }
      theme {
        id
        logo {
          id
          url
          title
          height
          width
          fileName
        }
        primaryColor
      }
    }
  `,
};
