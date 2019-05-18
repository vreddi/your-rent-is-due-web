import React, { Component } from 'react';
import Bounce from 'bounce.js';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import './SearchBox.scss';

class SearchBox extends Component {
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
      value: '',
      focussed: false,
    };
  }

  onInputChange = ({ target: { value } }) => {
    const { onValueChangeCallback } = this.props;
    this.setState(
      { value },
      () => onValueChangeCallback(value),
    );
  };

  onInputFocus = ({ target }) => {
    const t = target;
    const { onFocusChangeCallback } = this.props;

    t.placeholder = '';
    this.setState(
      { focussed: true },
      () => onFocusChangeCallback(true),
    );
  }

  onInputFocusOut = ({ target }) => {
    const t = target;
    const { onFocusChangeCallback } = this.props;

    t.placeholder = 'Quick Access';
    this.setState(
      { focussed: false },
      () => onFocusChangeCallback(false),
    );
  }

  onCancelClick = () => {
    const { onCancelClickCallback, clearOnCancel } = this.props;

    if (clearOnCancel) {
      this.setState({ value: '' });
    }

    onCancelClickCallback();
  }

  showCancelButton = () => {
    const { focussed, value } = this.state;

    if (focussed || value.length > 0) {
      return (
        <button
          type="button"
          onClick={this.onCancelClick}
          className="cancel-button"
        >
          Cancel
        </button>
      );
    }

    return null;
  }

  render = () => {
    const { placeholder, inputType } = this.props;
    const { value } = this.state;

    return (
      <div className="searchbox-container">
        <div className="searchbox">
          <FontAwesomeIcon className="searchbox-icon" icon={faSearch} />
          <input
            onChange={this.onInputChange}
            onFocus={this.onInputFocus}
            onBlur={this.onInputFocusOut}
            placeholder={placeholder}
            value={value}
            type={inputType}
            spellCheck={false}
          />
          <i />
        </div>
        {this.showCancelButton()}
      </div>
    );
  }
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  onValueChangeCallback: PropTypes.func,
  onFocusChangeCallback: PropTypes.func,
  onCancelClickCallback: PropTypes.func,
  clearOnCancel: PropTypes.bool,
};

SearchBox.defaultProps = {
  placeholder: '',
  inputType: 'text',
  clearOnCancel: false,
  onValueChangeCallback: () => null,
  onFocusChangeCallback: () => null,
  onCancelClickCallback: () => null,
};

export default SearchBox;
