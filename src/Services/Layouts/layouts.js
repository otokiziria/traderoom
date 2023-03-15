import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getLayouts = async () => {
  
  try{
    const res = await axios.get('/api/Layouts');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getLayout  = async (id) => {
  
  try{
    const res = await axios.get('/api/Layouts/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveLayouts = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/Layouts', body, config);
    if(res.data.status == 1){
      showAlertMSG('Layout inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Layout not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteLayout = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/Layouts/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Layout deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Layout not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getActiveLayouts = async () => {
  try{
    const res = await axios.get('/api/Layouts/getactivelayout');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}