import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getErrorreports = async () => {
  
  try{
    const res = await axios.get('/api/errorreports');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getErrorreport  = async (id) => {
  
  try{
    const res = await axios.get('/api/errorreports/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveErrorreports = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/errorreports', body, config);
    if(res.data.status == 1){
      showAlertMSG('Errorreport inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Errorreport not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteErrorreport = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/errorreports/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Errorreport deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Errorreport not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
