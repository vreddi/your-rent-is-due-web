import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import client from 'root/index';
import Divider from '@material-ui/core/Divider';
import getSubscriptionImage from 'queries/subscriptions/getImage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as RainClouds from 'assets/images/raining.svg';
import TrackingItemUtils from 'utils/trackingItem';
import Typography from '@material-ui/core/Typography';

import './TrackingItemCard.scss';
import Deadline from '../../../utils/deadline';

class TrackingItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: TrackingItemUtils.getLoadingImage(), // Default loading image
    };
  }

  componentDidMount = () => {
    const { image, metadataId } = this.props;

    if (metadataId && !(image && image !== TrackingItemUtils.getLoadingImage())) {
      client.query({
        query: getSubscriptionImage,
        variables: {
          filter: {
            id: metadataId,
          },
        },
      }).then(({ data }) => {
        if (data.subscriptions[0] && data.subscriptions[0].image.contentType) {
          this.setState({ image: `data:${data.subscriptions[0].image.contentType};base64,${data.subscriptions[0].image.data}` });
        }
      });
    } else {
      this.setState({ image: RainClouds });
    }
  }

  getAutoPayAnswer = () => {
    const { autopay } = this.props;
    if (autopay) {
      return (
        <div className="trackingItemCard-autopay-activated">
          Activated
        </div>
      );
    }

    return (
      <div className="trackingItemCard-autopay-deactivated">
        De-activated
      </div>
    );
  }

  render = () => {
    const { image } = this.state;
    const {
      title,
      recurringDate,
      cost,
      frequency,
    } = this.props;

    return (
      <Card className="trackingitemcard">
        <div className="trackingitemcard-header">
          <Avatar className="trackingitemcard-image" src={image} />
          <Typography
            variant="overline"
            gutterBottom
          >
            {`Due in ${Deadline.getTimeDifferenceToClientString(Deadline.getTimeDifference(frequency, recurringDate))}`}
          </Typography>
        </div>
        <Divider light />
        <CardContent className="trackingItemCard-content">
          <Typography
            variant="h6"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography className="trackingItemCard-section1" gutterBottom>
            <div className="trackingItemCard-cost">
              <Typography variant="h5">{`$${cost}`}</Typography>
              <div className="trackingItemCard-frequency">
                {`/${Deadline.getClientStringForFrequency(frequency)}`}
              </div>
            </div>
            <div className="trackingItemCard-autopay">
              Auto-pay:
              {this.getAutoPayAnswer()}
            </div>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

TrackingItemCard.propTypes = {
  metadataId: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  cost: PropTypes.string,
  frequency: PropTypes.string,
  recurringDate: PropTypes.string,
  autopay: PropTypes.bool,
  getSubscriptionMetadataImage: PropTypes.func,
};

// TODO: Add appropriate defaults
TrackingItemCard.defaultProps = {
  metadataId: null,
  title: '',
  cost: '',
  autopay: false,
  frequency: '',
  recurringDate: '',
  image: null,
  getSubscriptionMetadataImage: () => null,
};

export default TrackingItemCard;
