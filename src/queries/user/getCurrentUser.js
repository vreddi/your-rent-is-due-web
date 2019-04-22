import gql from 'graphql-tag';

// Responsible to return the current user logged in the application
export default gql`
  {
    user {
      id
      email
      profileImg {
        data
        contentType
      }
    }
  }
`;
