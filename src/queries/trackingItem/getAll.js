import gql from 'graphql-tag';

export default gql`
  {
    trackingItems {
      id
      userId
      title
      amount
      autoPaySet
      frequency
      subscriptionTemplateId
      recurringDate
    }
  }
`;
