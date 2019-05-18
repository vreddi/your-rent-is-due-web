import React, { Component } from 'react';
import client from 'root/index';
import $ from 'jquery';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchBox from 'components/QuickAccessSearch/SearchBox/SearchBox';
import SearchImage from 'assets/images/search_animated.svg';
import NoResultsImage from 'assets/images/leaf.svg';
import getSubscriptions from 'queries/subscriptions/getByFilter';
import './SearchBoxCover.scss';
import QuickAccessRow from 'components/QuickAccessSearch/QuickAccessRow/QuickAccessRow';
import QuickAccessAddSubscription from '../QuickAccessAddSubscription/QuickAccessAddSubscription';


class SearchBoxCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      showCover: false,
      searchResults: [],
      showQuickAccessRowAddForm: false,
      selectedRowContent: null,
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
    const { showQuickAccessRowAddForm } = this.state;

    if (showQuickAccessRowAddForm) {
      this.setState({
        showQuickAccessRowAddForm: false,
      });
    } else {
      this.setState({
        showCover: false,
        searchResults: [],
        searchValue: '',
      });
    }
  }

  onQuickAccessRowClick = ({ currentTarget }) => {
    const rowName = $(currentTarget).text();
    const rowImage = $(currentTarget).find('img').attr('src');

    this.setState({
      showQuickAccessRowAddForm: true,
      selectedRowContent: {
        title: rowName,
        image: rowImage,
      },
    });
  }

  onSearchBoxFocusChange = (isFocussed) => {
    const { searchValue } = this.state;
    this.setState({ showCover: isFocussed || searchValue.length });
  }

  getQuickAccessRowAddForm = () => {
    const { selectedRowContent } = this.state;
    const { title, image } = selectedRowContent;

    return (
      <QuickAccessAddSubscription
        title={title}
        image={image}
        addBtnClick={() => this.setState({ showQuickAccessRowAddForm: false })}
      />
    );
  }

  getSearchResults = () => {
    const { noResultsMessage } = this.props;
    const {
      showCover,
      searchValue,
      searchResults,
      showQuickAccessRowAddForm,
    } = this.state;

    if (showCover) {
      if (showQuickAccessRowAddForm) {
        return this.getQuickAccessRowAddForm();
      }

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
              onRowClick={this.onQuickAccessRowClick}
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
    const { showCover, showQuickAccessRowAddForm } = this.state;
    const searchBoxCoverClassNames = classNames({
      'searchbox-cover-preserved': true,
      'searchbox-cover': showCover,
    });

    return (
      <div className={searchBoxCoverClassNames}>
        <SearchBox
          clearOnCancel={!showQuickAccessRowAddForm}
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
