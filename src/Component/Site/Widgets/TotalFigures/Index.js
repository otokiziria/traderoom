import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';


function TotalFiguresIndex(props) {
    const { t } = useTranslation();
    //console.log('props.totalFigureData = ', props.totalFigureData);
    //console.log('props.totalFigureSettings = ', props.totalFigureSettings);
    if(props.totalFigureData==null || props.totalFigureSettings==null){
        return <div className="leftSideLoader navLoader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div>Loading...</div></div>
    }
    else{
        return(
            <div className="totalfigures">
                {(props.totalFigureSettings.balance) ? 
                <div><div>{t('Balance')}: </div><div>{props.totalFigureData.Balance + ((props.totalFigureData.Credit !== null && !isNaN(parseFloat(props.totalFigureData.Credit))) ? parseFloat(props.totalFigureData.Credit) : 0)}</div></div> 
                : ''}
                {(props.totalFigureSettings.margin) ? 
                <div><div>{t('Margin')}: </div><div>{props.totalFigureData.Margin}</div></div> 
                : ''}
                {(props.totalFigureSettings.free_margin) ? 
                <div><div>{t('Margin Free')}: </div><div>{props.totalFigureData.MarginFree}</div></div> 
                : ''}
                {(props.totalFigureSettings.profit) ? 
                <div><div>{t('Profit')}: </div><div>{props.totalFigureData.Profit.toFixed(2)}</div></div> 
                : ''}
                {(props.totalFigureSettings.equity) ? 
                <div><div>{t('Equity')}: </div><div>{props.totalFigureData.Equity.toFixed(2)}</div></div> 
                : ''}
            
        </div>
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
    totalFigureData: state.totalFigureData.totalFigureData,
    totalFigureSettings: state.totalFigureSettings.totalFigureSettings
  };
};

export default connect(mapStateToProps, null)(TotalFiguresIndex);
