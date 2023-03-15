import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentIndex from './Content/Index';
import HeaderIndex from './Header/Index';
import FilterIndex from './Filter/Index';
import FavoritesIndex from './Favorites/Index';

import { connect } from "react-redux";

function LeftSideIndex(props) {
  const { t } = useTranslation();
  return (
  <div className="leftsiteWidget">
    <div className="leftsiteWidgetHeader">
     <HeaderIndex />
    </div>
    <div className="leftsiteWidgetContent">
      {(props.symbolFilter !== null && props.symbolFilter.type == 1) ? <FavoritesIndex /> : ''}
      
      {(props.symbolFilter !== null && (props.symbolFilter.type == 2 || props.symbolFilter.type == 3)) ? <FilterIndex id={props.symbolFilter.id} /> : ''}
      {(props.symbolFilter === null || props.symbolFilter.type == 0) ? <ContentIndex /> : ''}

    </div>
  </div>
  )
}


const mapStateToProps = (state) => {
  return {
    symbolFilter: state.symbolFilter.symbolFilter
  };
};

export default connect(mapStateToProps, null)(LeftSideIndex);
