import axios from "axios";
import { getAuthAction  } from "../../Red";
import store from "../../Red/store";
import {showErrors} from "../../Lib/helpers";
import setAuthToken from "../../Utils/setAuthToken"

export const loadUser = async () => {
  if(localStorage.getItem('token')){
    setAuthToken(localStorage.getItem('token'))
  }
  try{
    const res = await axios.get('/api/auth');
    let user = res.data;
    store.dispatch(
      getAuthAction({ token: localStorage.getItem('token'), user: user, isAuthenticated: true, loaded: true })
    );
  }
  catch(err){
    store.dispatch(getAuthAction({ token: null, user: {}, isAuthenticated: false, loaded: true }));
    localStorage.removeItem('token'); 
 }
}

export const AuthUser = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post(url, body, config);
    let token = res.data.token;
    let user = res.data.user;
    let isAuthenticated = true;
    store.dispatch(
      getAuthAction({ token: token, user: user, isAuthenticated: isAuthenticated, loaded: true })
    );
    localStorage.setItem('token', token);
    setAuthToken(token);
  } catch (err) {
    store.dispatch(getAuthAction({ token: null, user: {}, isAuthenticated: false, loaded: true }));
    localStorage.removeItem('token');
    showErrors(err);
  }
};
