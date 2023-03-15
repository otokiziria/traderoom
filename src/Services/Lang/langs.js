import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getLangs = async () => {
  
  try{
    const res = await axios.get('/api/lang');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getLang  = async (id) => {
  
  try{
    const res = await axios.get('/api/lang/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveLangs = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/lang', body, config);
    if(res.data.status == 1){
      showAlertMSG('Language inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Language not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteLang = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/lang/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Language deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Language not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const generateLanguageJson = async () => {
  try{
    const res = await axios.get('/api/lang/generatelanguage');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}