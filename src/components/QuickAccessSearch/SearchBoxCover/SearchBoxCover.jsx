import React, { Component } from 'react';
import client from 'root/index';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchBox from 'components/QuickAccessSearch/SearchBox/SearchBox';
import SearchImage from 'assets/images/search_animated.svg';
import NoResultsImage from 'assets/images/leaf.svg';
import getSubscriptions from 'queries/subscriptions/getByFilter';
import './SearchBoxCover.scss';
import QuickAccessRow from 'components/QuickAccessSearch/QuickAccessRow/QuickAccessRow';


class SearchBoxCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      showCover: false,
      searchResults: [],
    };
  }

  onSearchValueChange = (searchValue) => {
    if (searchValue) {
      client.query({
        query: getSubscriptions,
        variables: {
          filter: {
            contains: searchValue,
          },
        },
      }).then(({ data }) => {
        const { subscriptions } = data;
        this.setState({
          searchValue,
          searchResults: subscriptions,
        });
      });
    } else {
      this.setState({
        searchValue,
        searchResults: [],
      });
    }
  }

  onCancelClick = () => {
    this.setState({
      showCover: false,
      searchResults: [],
      searchValue: '',
    });
  }

  onSearchBoxFocusChange = (isFocussed) => {
    const { searchValue } = this.state;
    this.setState({ showCover: isFocussed || searchValue.length });
  }

  getSearchResults = () => {
    const { noResultsMessage } = this.props;
    const { showCover, searchValue, searchResults } = this.state;

    if (showCover) {
      if (searchValue.length === 0) {
        return (
          <div className="searchbox-cover-results">
            <img src={SearchImage} alt="" className="searchbox-cover-no-search-image" />
            <div className="searchbox-cover-no-search-text">
              {noResultsMessage}
            </div>
          </div>
        );
      }

      if (searchResults.length > 0) {
        const results = searchResults.map(
          subscription => (
            <QuickAccessRow
              key={subscription.id}
              image={`data:${subscription.image.contentType};base64,${subscription.image.data}`}
              title={subscription.name}
            />
          ),
        );
        return (
          <div className="searchbox-cover-results">
            {results}
          </div>
        );
      }

      return (
        <div className="searchbox-cover-results">
          <img src={NoResultsImage} alt="" className="searchbox-cover-no-results-image" />
          <div className="searchbox-cover-no-results-text">
            No results
          </div>
        </div>
      );
    }

    return null;
  }

  render = () => {
    const { showCover } = this.state;
    const searchBoxCoverClassNames = classNames({
      'searchbox-cover-preserved': true,
      'searchbox-cover': showCover,
    });

    return (
      <div className={searchBoxCoverClassNames}>
        <SearchBox
          placeholder="Quick Access"
          onValueChangeCallback={this.onSearchValueChange}
          onFocusChangeCallback={this.onSearchBoxFocusChange}
          onCancelClickCallback={this.onCancelClick}
        />
        <div className="searchbox-cover-results-container">
          {this.getSearchResults()}
        </div>
      </div>
    );
  }
}

SearchBoxCover.propTypes = {
  noResultsMessage: PropTypes.string,
};

SearchBoxCover.defaultProps = {
  noResultsMessage: '',
};

export default SearchBoxCover;
