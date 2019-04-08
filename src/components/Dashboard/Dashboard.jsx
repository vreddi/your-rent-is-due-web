import React from 'react';
import Header from 'components/Header/Header';
import SearchBoxCover from 'components/QuickAccessSearch/SearchBoxCover/SearchBoxCover';

// TODO: Move all the place components in their own area
const Dashboard = () => (
  <div className="dashboard">
    <Header />
    <div style={{marginTop: "200px", marginLeft: "300px"}}>
      <SearchBoxCover noResultsMessage="Quickly search services and subscriptions, add to your list or find existing tracking items."/>
    </div>
  </div>
);

export default Dashboard;
