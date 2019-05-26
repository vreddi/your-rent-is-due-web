import gql from 'graphql-tag';

export default gql`
  query GetSubscriptions($filter: SearchInputType) {
    subscriptions(filter: $filter) {
      image {
        contentType
        data
      }
    }
  }
`;
