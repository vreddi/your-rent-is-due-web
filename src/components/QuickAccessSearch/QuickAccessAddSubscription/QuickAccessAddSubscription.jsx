import './QuickAccessAddSubscription.scss';
import 'date-fns';
import { graphql } from 'react-apollo';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Bounce from 'bounce.js';
import Button from '@material-ui/core/Button';
import createTrackingItemMutation from 'mutations/trackingItem/create';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Switch from 'react-switch';
import TextField from '@material-ui/core/TextField';
import TrackingItemUtils from 'utils/trackingItem';
import getAllTrackingItems from 'queries/trackingItem/getAll';

class QuickAccessAddSubscription extends Component {
  constructor(props) {
    super(props);

    const bounce = new Bounce();
    bounce
      .scale({
        from: { x: 0.5, y: 0.5 },
        to: { x: 1, y: 1 },
        easing: 'bounce',
        duration: 1000,
        bounces: 4,
        stiffness: 1,
      })
      .scale({
        from: { x: 0.5, y: 0.5 },
        to: { x: 1, y: 1 },
        easing: 'bounce',
        duration: 1000,
        bounces: 6,
        stiffness: 1,
      });

    bounce.define('jelly');

    this.state = {
      billFrequencyValue: TrackingItemUtils.trackingItemFrequency.MONTHLY,
      selectedDate: new Date(),
      amount: '',
      autoPay: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleAutoPayChange = (autoPay) => {
    this.setState({ autoPay });
  }

  onAddBtnClick = () => {
    const {
      createTrackingItem,
      id,
      title,
      addBtnClick,
    } = this.props;
    const {
      amount,
      autoPay,
      billFrequencyValue,
    } = this.state;
    const trackingItem = {
      title,
      amount: parseFloat(amount),
      autoPaySet: autoPay,
      type: TrackingItemUtils.trackingItemType.SUBSCRIPTION,
      frequency: billFrequencyValue,
      subscriptionTemplateId: id,
    };

    createTrackingItem({
      variables: { trackingItem },
      refetchQueries: [{ query: getAllTrackingItems }],
    }).then(() => addBtnClick());
  }

  updateSelectedDate = selectedDate => this.setState({ selectedDate });

  getSubscriptionBillFrquencyOptions = () => (
    TrackingItemUtils.billFrequencyOptions.map(({ value, label }) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))
  );

  getDatePickerField = () => {
    const { billFrequencyValue, selectedDate } = this.state;
    const date = new Date();
    const datePickerTitle = 'Renewal date';

    switch (billFrequencyValue) {
      case TrackingItemUtils.trackingItemFrequency.MONTHLY:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              className="quickaccess-frequency-datepicker-container"
              container
              justify="space-around"
            >
              <DatePicker
                className="quickaccess-frequency-datepicker"
                minDate={new Date(date.getFullYear(), date.getMonth(), 1)}
                maxDate={new Date(date.getFullYear(), date.getMonth() + 1, 0)}
                margin="normal"
                label={datePickerTitle}
                value={selectedDate}
                onChange={this.updateSelectedDate}
                views={['day']}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        );

      case TrackingItemUtils.trackingItemFrequency.ANNUALLY: return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            className="quickaccess-frequency-datepicker-container"
            container
            justify="space-around"
          >
            <DatePicker
              className="quickaccess-frequency-datepicker"
              minDate={new Date(date.getFullYear(), 0, 1)}
              maxDate={new Date(date.getFullYear(), 11, 31)}
              margin="normal"
              label={datePickerTitle}
              value={selectedDate}
              onChange={this.updateSelectedDate}
              views={['year', 'month', 'day']}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      );

      default: return null;
    }
  }

  getAddSubscriptionForm = () => {
    const { billFrequencyValue, amount, autoPay } = this.state;
    const { title, image } = this.props;
    return (
      <div className="quickaccess-subscription-form">
        <div className="quickaccess-header">
          <div className="quickaccess-header-left">
            <img src={image} alt="" className="quickaccess-header-image" />
            <div className="quickaccess-header-title">{title}</div>
          </div>
          <div className="quickaccess-header-right">
            <Switch
              checked={autoPay}
              onChange={this.handleAutoPayChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
          </div>
        </div>
        <div className="quickaccess-frequency-content">
          <TextField
            className="quickaccess-frequency"
            id="outlined-select-currency-native"
            select
            label="Bill frequency"
            value={billFrequencyValue}
            onChange={this.handleChange('billFrequencyValue')}
            margin="normal"
            variant="outlined"
          >
            {this.getSubscriptionBillFrquencyOptions()}
          </TextField>
          {this.getDatePickerField()}
        </div>
        <FormControl fullWidth className="quickaccess-amount">
          <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
          <Input
            id="adornment-amount"
            value={amount}
            onChange={this.handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <Button color="primary" onClick={this.onAddBtnClick}>
          Add
        </Button>
      </div>
    );
  }

  render = () => (
    <div className="quickaccess-add-subscription">
      {this.getAddSubscriptionForm()}
    </div>
  )
}

QuickAccessAddSubscription.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  createTrackingItem: PropTypes.func,
  addBtnClick: PropTypes.func,
};

QuickAccessAddSubscription.defaultProps = {
  id: null,
  title: '',
  image: '',
  createTrackingItem: () => null,
  addBtnClick: () => null,
};

export default graphql(getAllTrackingItems)(
  graphql(
    createTrackingItemMutation,
    { name: 'createTrackingItem' },
  )(QuickAccessAddSubscription),
);
