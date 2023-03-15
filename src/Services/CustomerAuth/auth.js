import axios from "axios";
import { getCustomerAuthAction  } from "../../Red";
import store from "../../Red/store";
import {showAlertMSG, showErrors} from "../../Lib/helpers";
import setAuthToken from "../../Utils/setAuthToken"

export const loadUser = async (url) => {
  if(localStorage.getItem('token')){
    setAuthToken(localStorage.getItem('token'))
  }
  console.log('url = ',url);
  try{
    const res = await axios.get('/api/authentication');
    let user = res.data;
    if(user.status == 1){
      store.dispatch(
        getCustomerAuthAction({ token: localStorage.getItem('token'), user: user, isAuthenticated: true, loaded: true })
      );
    }
    else{
      showAlertMSG(user.msg, 3);
      window.location.replace(url);
    }
    
    return user;
  }
  catch(err){
    store.dispatch(getCustomerAuthAction({ token: null, user: {}, isAuthenticated: false, loaded: true }));
    localStorage.removeItem('token'); 
    showAlertMSG('Session Expires', 3);
    window.location.replace(url);
    
 }
}

export const AuthUser = async (url, data, lang = 'en') => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/authentication',  body, config);
    
    
    let token = res.data.token;
    let user = res.data.user;
    let isAuthenticated = true;
    console.log('token', token);
    localStorage.setItem('token', token);
    setAuthToken(token);
    
    store.dispatch(
      getCustomerAuthAction({ token: token, user: user, isAuthenticated: isAuthenticated, loaded: true })
    );
    
    
  } catch (err) {
    store.dispatch(getCustomerAuthAction({ token: null, user: {}, isAuthenticated: false, loaded: true }));
    localStorage.removeItem('token');
    showErrors(err);
    showAlertMSG('Authentification Failed', 2);
    
    setTimeout(function(){
      window.location.replace(url);
    },3000)
  }
};
