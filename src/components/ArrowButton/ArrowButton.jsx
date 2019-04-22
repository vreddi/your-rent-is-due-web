import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.scss';

const ArrowButton = ({ title, onBtnClick }) => (
  <button
    type="button"
    className="arrow-button"
    onClick={onBtnClick}
  >
    {title}
    <span className="bg" />
  </button>
);

ArrowButton.propTypes = {
  title: PropTypes.string,
  onBtnClick: PropTypes.func,
};

ArrowButton.defaultProps = {
  title: '',
  onBtnClick: () => null,
};

export default ArrowButton;
