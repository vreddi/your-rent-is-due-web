import React, { Component } from 'react';
import TrackingItemCard from 'components/TrackingItem/TrackingItemCard/TrackingItemCard';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getAllTrackingItems from 'queries/trackingItem/getAll';

import './TrackingItemContainer.scss';

class TrackingItemContainer extends Component {
  getTrackingItems = () => {
    const { data } = this.props;
    const { loading, trackingItems } = data;
    let dueDateString;

    if (loading || !trackingItems) {
      return (<div>Loading...</div>);
    }

    return trackingItems.map(trackingItem => {
      const {
        id,
        subscriptionTemplateId,
        amount,
        title,
        frequency,
        recurringDate,
        autoPaySet,
      } = trackingItem;

      return (
        <TrackingItemCard
          key={id}
          metadataId={subscriptionTemplateId}
          title={title}
          cost={amount}
          autopay={autoPaySet}
          recurringDate={recurringDate}
          frequency={frequency}
        />
      );
    });
  }

  render = () => (
    <div className="trackingitemcontainer">
      {this.getTrackingItems()}
    </div>
  );
}

TrackingItemContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

TrackingItemContainer.defaultProps = {
  data: [],
};

export default graphql(getAllTrackingItems)(TrackingItemContainer);
