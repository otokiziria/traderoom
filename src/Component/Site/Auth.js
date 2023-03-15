import React, { useRef, useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthUser } from "../../Services/CustomerAuth/auth";
import './Loader.css';
import { getCustomerAuthAction, getSettingsAction  } from "../../Red";
import store from "../../Red/store";
import setAuthToken from "../../Utils/setAuthToken";
import AlertMSG from "../Alerts/AlertMSG";
import { getSetting } from "../../Services/LoadContent/LoadContent";
import i18n from "../../Languages/i18n";
import {showAlertMSG} from "../../Lib/helpers";
import {getActiveLanguageAction} from "../../Red";
//if (localStorage.getItem("token")) {
//  setAuthToken(localStorage.getItem("token"));
//}

function CustomerAuth(props) {
  const urlParams = props.match.params;
  
  const [isLogedIn, setisLogedIn] = useState(false);
  
  const getSettings = async () => {
    let set = await getSetting();
    if(set !== null && set.status == 1){
      AuthUser(set.row.website_url,{token: urlParams.token, ID: urlParams.ID, isLead: urlParams.isLead });
      i18n.changeLanguage(urlParams.lang);
      store.dispatch(
        getActiveLanguageAction(urlParams.lang)
      );
    }
    else{
      showAlertMSG('Can not fetch data from server', 3);
    }

  }

  useEffect(() => {
    localStorage.removeItem('token');
    setAuthToken("");
    store.dispatch(getCustomerAuthAction({ token: null, user: {}, isAuthenticated: false, loaded: true }));
    
    getSettings();
    
  }, []);

  useEffect(() => {
    console.log(props.customerAuth)
    if(props.customerAuth !== undefined && props.customerAuth.isAuthenticated && localStorage.getItem("token")){
      setisLogedIn(true);
    }
  }, [props.customerAuth]);

  useEffect(() => {
    console.log(props.customerAuth)
    if(props.customerAuth !== undefined && props.customerAuth.isAuthenticated && localStorage.getItem("token")){
      setisLogedIn(true);
    }
  }, [props.customerAuth]);

  
  
  if(isLogedIn === true){
    return <Redirect to="/" />
  }
  return (
    <div style={{backgrounColor: '#000'}}><AlertMSG /><div className="authloader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div>Loading...</div></div></div>
  );
}
const mapStateToProps = (state) => {
    return {
      customerAuth: state.customerAuth.customerAuth,
    };
  };
  
export default connect(mapStateToProps, null)(CustomerAuth);

