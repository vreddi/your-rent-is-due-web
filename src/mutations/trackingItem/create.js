import gql from 'graphql-tag';

export default gql`
  mutation CreateTrackingItem($trackingItem: TrackingItemCreateInputType) {
    createTrackingItem(trackingItem: $trackingItem) {
      id
      title
      userId
    }
  }
`;
