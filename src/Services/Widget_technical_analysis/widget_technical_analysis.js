import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getWidget_technical_analysiss = async () => {
  
  try{
    const res = await axios.get('/api/widget-technical-analysis');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getWidget_technical_analysis  = async (id) => {
  
  try{
    const res = await axios.get('/api/widget-technical-analysis/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveWidget_technical_analysiss = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/widget-technical-analysis', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget technical analysis inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget technical analysis not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteWidget_technical_analysis = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/widget-technical-analysis/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget technical analysis deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget technical analysis not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
