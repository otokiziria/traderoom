import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import Symbols from "../Content/Symbols";

function FavoritesIndex(props) {
  const { t } = useTranslation();

  const [symbols, setsymbols] = useState([]);
  const [showSymbols, setshowSymbols] = useState(0);

  useEffect(() => {
    if (
      props.leftSideSettings == null &&
      props.leftSideData == null &&
      props.favoriteSymbols == null ||
      props.leftSideData.length == 0
    ) {
      console.log('1');
      setshowSymbols(0);
    }
    else if (
      props.leftSideData[0] !== undefined &&
      props.leftSideData[0].total !== undefined &&
      props.leftSideData[0].total == 0
    ) {
      console.log('2');
      setshowSymbols(2);
    } else if (props.favoriteSymbols.length == 0) {
      console.log('3');
      setshowSymbols(2);
    } else {
      let arr = [];
      props.leftSideData.forEach((el) => {
        if (props.favoriteSymbols.includes(el.symbol)) {
          arr.push(el);
        }
      });
      console.log('============11==', arr);
      setsymbols(arr);
      setshowSymbols(1);
    }
    
    
  }, [props.leftSideData]);

  if(showSymbols == 2){
    return <>No Data</>;
  }
  else if(showSymbols == 0){
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
  }
  else if(symbols.length > 0){
    return  <Accordion key={'filter_symbols'}><Symbols data={symbols} settings={props.leftSideSettings} /></Accordion>
    
  }
  else{
    return <>{t('No Data')}</>;
  }
  
}

const mapStateToProps = (state) => {
  return {
    leftSideData: state.leftSideData.leftSideData,
    leftSideSettings: state.leftSideSettings.leftSideSettings,
    favoriteSymbols: state.favoriteSymbols.favoriteSymbols,
  };
};

export default connect(mapStateToProps, null)(FavoritesIndex);
