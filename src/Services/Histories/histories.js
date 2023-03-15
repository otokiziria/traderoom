import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction, getHistoryDataAction } from "../../Red";
import store from "../../Red/store";

export const getHistories = async () => {
  
  try{
    const res = await axios.get('/api/histories');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getHistory  = async (id) => {
  
  try{
    const res = await axios.get('/api/histories/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveHistories = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/histories', body, config);
    if(res.data.status == 1){
      showAlertMSG('History inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('History not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteHistory = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/histories/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('History deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('History not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}


const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export  async function getHistoryFromCrm(start_date = '', end_date = '') {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let strd = formatDate(start_date);
  let endd = formatDate(end_date);
  if(end_date !== "" && end_date == ""){
    return false;
  }
  else if(end_date == "" && end_date !== ""){
    return false;
  }
  else if(start_date == '' && end_date == ''){

    var d = new Date();
    var e = new Date();
    strd = formatDate(d);
    e.setDate(d.getDate() + 1);
    endd = formatDate(e);
  }
  console.log(start_date, end_date);
  const body = JSON.stringify({start_date: strd, end_date: endd});
  try {
    const res = await axios.post('/crm/history', body, config);
    if(res.data.status == 1){
      //showAlertMSG('History deleted successfully', 1);
      store.dispatch(getHistoryDataAction(res.data.row));
    }
    else{
      showAlertMSG('History did not fetched from CRM', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}



