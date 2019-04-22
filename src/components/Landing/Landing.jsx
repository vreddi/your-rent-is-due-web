import React, { Component } from 'react';
import Header from 'components/Header/Header';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import FormModal from 'components/FormModal/FormModal';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import loginMutation from 'mutations/auth/login';
import signupMutation from 'mutations/auth/signup';
import currentUserQuery from 'queries/user/getCurrentUser';
import Routes from 'utils/routes';

import './Landing.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      showForm: false,
      selectedTab: 1,
    };
  }

  onStartBtnClick = () => {
    this.setState({ showForm: true });
  }

  getLoginFormContents = () => (
    <div className="form-modal-contents">
      <TextField
        id="standard-userna,e-input"
        label="Username"
        type="username"
        autoComplete="current-username"
        margin="normal"
        onChange={event => this.setState({ email: event.target.value })}
        fullWidth
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={event => this.setState({ password: event.target.value })}
        margin="normal"
        fullWidth
      />
      <Fab
        variant="extended"
        aria-label="Login"
        color="primary"
        className="form-btn"
        onClick={this.onFormBtnClicked}
      >
        Login
      </Fab>
    </div>
  );

  getSignupFormContents = () => (
    <div className="form-modal-contents">
      <TextField
        id="standard-username-input"
        label="Username"
        type="username"
        autoComplete="current-username"
        margin="normal"
        onChange={event => this.setState({ email: event.target.value })}
        fullWidth
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={event => this.setState({ password: event.target.value })}
        margin="normal"
        fullWidth
      />
      <TextField
        id="standard-confirm-password-input"
        label="Confirm password"
        type="password"
        onChange={event => this.setState({ password: event.target.value })}
        autoComplete="current-confirm-password"
        margin="normal"
        fullWidth
      />
      <Fab
        variant="extended"
        aria-label="Sign-up"
        color="primary"
        className="form-btn"
        onClick={this.onFormBtnClicked}
      >
        Sign-up
      </Fab>
    </div>
  )

  onFormBtnClicked = () => {
    const { selectedTab, email, password } = this.state;
    const { login, signup } = this.props;

    if (selectedTab === 1) {
      login({
        variables: { email, password },
        refetchQueries: [{ query: currentUserQuery }],
      });
    } else if (selectedTab === 0) {
      signup({
        variables: { email, password },
        refetchQueries: [{ query: currentUserQuery }],
      });
    }
  }

  getFormContents = () => {
    const { selectedTab } = this.state;

    if (selectedTab === 1) {
      return this.getLoginFormContents();
    }

    return this.getSignupFormContents();
  }

  renderFormModal = () => {
    const { showForm, selectedTab } = this.state;

    if (showForm) {
      return (
        <FormModal>
          <AppBar position="absolute" color="default">
            <Tabs
              value={selectedTab}
              // onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                label="Sign-up"
                icon={<AccountCircleTwoTone />}
                onClick={() => this.setState({ selectedTab: 0, email: null, password: null })}
              />
              <Tab
                label="Login"
                icon={<FingerprintIcon />}
                onClick={() => this.setState({ selectedTab: 1, email: null, password: null })}
              />
            </Tabs>
          </AppBar>
          {this.getFormContents()}
        </FormModal>
      );
    }

    return null;
  }

  getLandingRoute = () => (
    <div className="landing-container">
      <Header>
        <ArrowButton
          title="Start"
          onBtnClick={this.onStartBtnClick}
        />
      </Header>
      <div className="landing">
        {this.renderFormModal()}
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
      routeContent = this.getLandingRoute();
    } else {
      routeContent = (<Redirect to={Routes.Dashboard} />);
    }

    return routeContent;
  }

  render = () => this.renderRoute();
}

Landing.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Landing.defaultProps = {
  login: () => null,
  signup: () => null,
  data: {},
};

export default graphql(currentUserQuery)(
  graphql(loginMutation, { name: 'login' })(
    graphql(signupMutation, { name: 'signup' })(
      Landing,
    ),
  ),
);
