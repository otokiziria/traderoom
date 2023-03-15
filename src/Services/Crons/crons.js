import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";

export const getCrons = async () => {
  
  try{
    const res = await axios.get('/api/crons');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const executeHLOC = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/executehloc', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getHLOC = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/gethloc', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const executeCurrency = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/executecurrency', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const executeDAYLYASK = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/executedaylyask', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getDAYLYASK = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/getdaylyask', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const executeLASTTICK = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/executelasttick', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getLASTTICK = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/getlasttick', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const executeHIGHLOW = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/executehighlow', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getHIGHLOW = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({'type':'execute'});
  try {
    const res = await axios.post('/api/crons/gethighlow', body, config);
    if(res.data.status == 1){
      showAlertMSG('Cron executed successfully', 1);
    }
    else{
      showAlertMSG('Cron not executed !!!', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}



