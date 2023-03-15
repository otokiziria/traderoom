import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Categories from './Categories';
import Accordion from "react-bootstrap/Accordion";

function ContentIndex(props) {
  const { t } = useTranslation();
  console.log('props.leftSideSettings = ',props.leftSideSettings);
  console.log('props.leftSideData = ',props.leftSideData);
  if (props.leftSideSettings == null && props.leftSideData == null) {
    return (
      <div className="leftSideLoader navLoader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>Loading...
        </div>
      </div>
    );
  } else {
    return <Accordion>
      {props.leftSideData.map((el,k)=>(
      
        (el.parent_id == 0) ? (<div className="leftsideWidghetParent"  key={k} ><Categories data={el} settings={props.leftSideSettings} /></div>) : ''
        
     ))}
     </Accordion>
  }
}

const mapStateToProps = (state) => {
  return {
    leftSideData: state.leftSideData.leftSideData,
    leftSideSettings: state.leftSideSettings.leftSideSettings,
  };
};

export default connect(mapStateToProps, null)(ContentIndex);
