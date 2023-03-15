import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getCharts = async () => {
  
  try{
    const res = await axios.get('/api/charts');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}


export const getChart = async (id) => {
  
  try{
    const res = await axios.get('/api/charts/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveCharts = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  console.log(body, "body data");
  try {
    const res = await axios.post('/api/charts', body, config);
    if(res.data.status == 1){
      showAlertMSG('Chart inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Chart not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteChart = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/charts/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Chart deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Chart not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
