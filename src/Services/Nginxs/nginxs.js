import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getNginxs = async () => {
  
  try{
    const res = await axios.get('/api/nginx');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getNginx  = async (id) => {
  
  try{
    const res = await axios.get('/api/nginx/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveNginxs = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/nginx', body, config);
    if(res.data.status == 1){
      showAlertMSG('Nginx inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Nginx not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteNginx = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/nginx/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Nginx deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Nginx not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const restartNginx = async () =>{
  try{
    const res = await axios.get('/api/nginx/restartnginx');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Nginx restarted succesfully', 1);
    }
    else{
      showAlertMSG('Nginx not restarted', 3);
    }
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const changeNginxSettings = async () =>{
  try{
    const res = await axios.get('/api/nginx/changenginxsettings');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Settings changed succesfully', 1);
    }
    else{
      showAlertMSG('Settings not changed', 3);
    }
    
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}