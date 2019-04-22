import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({ children }) => (
  <div className="header">
    <div className="version-tag">
      pre-alpha
      <span role="img" aria-label="cheers"> 🍻</span>
    </div>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.element,
};

Header.defaultProps = {
  children: null,
};

export default Header;
