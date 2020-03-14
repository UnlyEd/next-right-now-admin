import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const theme = {
  themeFields: gql`
    fragment themeFields on Theme {
      id
      primaryColor
      logo {
        id
        url
        height
        width
        fileName
      }
    }
  `,
};
