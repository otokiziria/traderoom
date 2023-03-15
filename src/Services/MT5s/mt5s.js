import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getMT5s = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getMT5sUrl = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/getmt5url');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}


export const getMT5  = async (id) => {
  
  try{
    const res = await axios.get('/metatrader/MT5/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveMT5s = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/metatrader/MT5', body, config);
    if(res.data.status == 1){
      showAlertMSG('MT5 inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('MT5 not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteMT5 = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/metatrader/MT5/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('MT5 deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('MT5 not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const savemt5ApiAddress = async (url) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({url: url});
  try {
    const res = await axios.post('/metatrader/MT5/savemt5ApiAddress', body, config);
    if(res.data.status == 1){
      showAlertMSG('MT5 saved api url successfully', 1);
     // store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('MT5 not saved api url deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const restartmt5  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/restartmt5');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Request sent succesfully', 1);
    }
    else{
      showAlertMSG('Request not sent ', 3);
    }
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const restartmt5crm  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/restartmt5crm');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Request sent succesfully', 1);
    }
    else{
      showAlertMSG('Request not sent ', 3);
    }
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}
export const stopmt5crm  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/stopmt5crm');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Request sent succesfully', 1);
    }
    else{
      showAlertMSG('Request not sent ', 3);
    }
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}
export const restartmt5tick  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/restartmt5tick');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Request sent succesfully', 1);
    }
    else{
      showAlertMSG('Request not sent ', 3);
    }
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}
export const stopmt5tick  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/stopmt5tick');
    let data = res.data;
    if(res.data.status == 1){
      showAlertMSG('Request sent succesfully', 1);
    }
    else{
      showAlertMSG('Request not sent ', 3);
    }
    
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const sendmt5credentials  = async () => {
  
  try{
    const res = await axios.get('/metatrader/MT5/sendmt5credentials');
    let data = res.data;

    if(res.data.status == 1){
      showAlertMSG('Sent succesfully', 1);
    }
    else{
      showAlertMSG('Did not sent', 3);
    }
    
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}
