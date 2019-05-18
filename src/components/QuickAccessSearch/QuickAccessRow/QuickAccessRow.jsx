import React from 'react';
import PropTypes from 'prop-types';
import './QuickAccessRow.scss';

const QuickAccessRow = ({ title, image, onRowClick }) => (
  <div
    role="button"
    tabIndex={0}
    onKeyDown={onRowClick}
    className="quickaccessrow"
    onClick={onRowClick}
  >
    <img src={image} alt="" className="quickaccessrow-image" />
    <div className="quickaccessrow-title">{title}</div>
  </div>
);

QuickAccessRow.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  onRowClick: PropTypes.func,
};

QuickAccessRow.defaultProps = {
  title: '',
  image: null,
  onRowClick: () => null,
};

export default QuickAccessRow;
