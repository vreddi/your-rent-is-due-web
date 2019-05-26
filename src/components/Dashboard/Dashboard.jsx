import React, { Component } from 'react';
import $ from 'jquery';
import Header from 'components/Header/Header';
import Avatar from '@material-ui/core/Avatar';
import Bounce from 'bounce.js';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import SearchBoxCover from 'components/QuickAccessSearch/SearchBoxCover/SearchBoxCover';
import currentUserQuery from 'queries/user/getCurrentUser';
import Routes from 'utils/routes';
import logoutMutation from 'mutations/auth/logout';
import './Dashboard.scss';
import TrackingItemContainer from '../TrackingItem/TrackingItemContainer/TrackingItemContainer';

// TODO: Move all the place components in their own area
class Dashboard extends Component {
  constructor(props) {
    super(props);

    const splatToLeft = new Bounce();

    splatToLeft
      .translate({
        from: { x: 300, y: 0 },
        to: { x: 0, y: 0 },
        easing: 'bounce',
        duration: 600,
        bounces: 4,
        stiffness: 4,
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 0.1, y: 2.3 },
        easing: 'sway',
        duration: 800,
        bounces: 4,
        stiffness: 2,
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 5, y: 1 },
        easing: 'sway',
        duration: 300,
        bounces: 4,
        stiffness: 3,
      });

      splatToLeft.define('splat-to-left');

      this.state = {
        showLogout: false,
      }
  }

  onAvatarClick = () => {
    this.setState({ showLogout: true });
  }

  onLogoutClick = () => {
    this.props.logout({
      refetchQueries: [{ query: currentUserQuery }],
    });
  }

  getAvatarContent = (data) => {
    const { showLogout } = this.state;

    if (!showLogout) {
      return (
        <Avatar
          className="dashboard-avatar"
          onClick={this.onAvatarClick}
          src={`data:${data.user.profileImg.contentType};base64,${data.user.profileImg.data}`}
        />
      );
    }
    else {
      return (
        <Button
          variant="contained"
          color="secondary"
          className="dashboard-logout"
          onClick= {this.onLogoutClick}
        >
          Logout
        </Button>
      );
    }
  }

  onDashboardClick = (e) => {
    const { showLogout } = this.state;
    const target = $(e.target);
    e.preventDefault();

    if (showLogout && !(target.is('span') || target.hasClass('dashboard-logout'))) {
      this.setState({ showLogout: false });
    }
  }

  getDashboardRoute = (data) => (
    <div className="dashboard" onClick={this.onDashboardClick}>
      <Header>
        {this.getAvatarContent(data)}
      </Header>
      <div className="dashboard-head">
        <SearchBoxCover noResultsMessage="Quickly search services and subscriptions, add to your list or find existing tracking items."/>
      </div>
      <div className="dashboard-body">
        <TrackingItemContainer />
      </div>
    </div>
  );

  /**
   * Based on if an active cookie for a logged in user exists, we direct to then
   * dashboard or show the signup box
   * @return {React.Component | Route} Component or Route(component) to render
   */
  renderRoute() {
    const { data } = this.props;
    const { loading, user } = data;
    let routeContent;

    if (loading) {
      routeContent = (<div>Loading...</div>);
    } else if (!loading && !user) {
      routeContent = (<Redirect to={Routes.Root} />);
    } else {
      routeContent = this.getDashboardRoute(data);
    }

    return routeContent;
  }

  render = () => this.renderRoute();
}

Dashboard.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Dashboard.defaultProps = {
  data: null,
};

export default graphql(currentUserQuery)(
  graphql(logoutMutation, { name: 'logout' })(Dashboard)
);
