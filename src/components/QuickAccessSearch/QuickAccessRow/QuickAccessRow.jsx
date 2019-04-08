import React from 'react';
import PropTypes from 'prop-types';
import './QuickAccessRow.scss';

const QuickAccessRow = ({ title, image }) => (
  <div className="quickaccessrow">
    <img src={image} alt="" className="quickaccessrow-image" />
    <div className="quickaccessrow-title">{title}</div>
  </div>
);

QuickAccessRow.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};

QuickAccessRow.defaultProps = {
  title: '',
  image: null,
};

export default QuickAccessRow;
