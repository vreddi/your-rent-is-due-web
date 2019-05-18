import gql from 'graphql-tag';

export default gql`
  {
    trackingItems {
      id
      userId
      title
    }
  }
`;
