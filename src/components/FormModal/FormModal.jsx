import React from 'react';
import PropTypes from 'prop-types';
import './FormModal.scss';

const FormModal = ({ children }) => (
  <div className="form-modal">
    {children}
  </div>
);

FormModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

FormModal.defaultProps = {
  children: null,
};

export default FormModal;
