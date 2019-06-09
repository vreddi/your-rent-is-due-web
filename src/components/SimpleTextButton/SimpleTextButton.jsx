import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import './SimpleTextButton.scss';

class SimpleTextButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showText: false,
    };
  }

  hoverOn = () => this.setState({ showText: true });

  hoverOff = () => this.setState({ showText: false });

  render = () => {
    const {
      onlyShowTextOnHover,
      text,
      icon,
      onClickCallback,
    } = this.props;
    const { showText } = this.state;

    return (
      <div className="simpletextbutton">
        <button
          className="simpletextbutton-btn"
          type="button"
          onClick={onClickCallback}
          onMouseEnter={onlyShowTextOnHover ? this.hoverOn : () => null}
          onMouseLeave={onlyShowTextOnHover ? this.hoverOff : () => null}
        >
          <FontAwesomeIcon className="simpletextbutton-icon" icon={icon} />
          <div className="simpletextbutton-text">
            {showText ? text : null }
          </div>
        </button>
      </div>
    );
  }
}

SimpleTextButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClickCallback: PropTypes.func,
  onlyShowTextOnHover: PropTypes.bool,
};

SimpleTextButton.defaultProps = {
  icon: faPlus,
  onClickCallback: () => null,
  text: '',
  onlyShowTextOnHover: true,
};

export default SimpleTextButton;
