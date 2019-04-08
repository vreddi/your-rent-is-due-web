import gql from 'graphql-tag';

export default gql`
  {
    subscriptions {
      id
      name
      link
      image {
        contentType
        data
      }
    }
  }
`;
