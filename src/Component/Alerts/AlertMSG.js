import React from "react";
import { connect } from "react-redux";
import { getAlertAction } from '../../Red';
import store from '../../Red/store' ;
import {alertTime} from '../../Lib/define';
import i18n from 'i18next';
//import { useTranslation } from 'react-i18next';
function AlertMSG(props) {
  //const { t } = useTranslation();
  
  console.log(alertTime);
  if (props.alert.status === 3) {
      setTimeout(function(){
        store.dispatch(getAlertAction({msg: null, status: 0}))
      }, alertTime);
    return (
      <div className="col-md-8 alert alert-danger">
        <strong>Error ! </strong>
        {i18n.t(props.alert.msg)}
      </div>
    );
  }
  else if (props.alert.status === 2) {
    setTimeout(function(){
        store.dispatch(getAlertAction({msg: null, status: 0}))
      }, alertTime);
    return (
      <div className="col-md-8 alert alert-warning">
        <strong>Warning ! </strong>
        {i18n.t(props.alert.msg)}
      </div>
    );
  }
  else if (props.alert.status === 1) {
    setTimeout(function(){
        store.dispatch(getAlertAction({msg: null, status: 0}))
      }, alertTime);
    return (
      <div className="col-md-8 alert alert-success">
        <strong>Success !</strong>
        {i18n.t(props.alert.msg)}
      </div>
    );
  }
  else{
      return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert.alert,
  };
};

export default connect(mapStateToProps, null)(AlertMSG);
