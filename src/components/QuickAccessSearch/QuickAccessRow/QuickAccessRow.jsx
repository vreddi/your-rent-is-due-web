import React from 'react';
import PropTypes from 'prop-types';
import './QuickAccessRow.scss';

const QuickAccessRow = ({
  id,
  title,
  image,
  onRowClick,
}) => (
  <div
    data-key={id}
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
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  onRowClick: PropTypes.func,
};

QuickAccessRow.defaultProps = {
  id: null,
  title: '',
  image: null,
  onRowClick: () => null,
};

export default QuickAccessRow;
