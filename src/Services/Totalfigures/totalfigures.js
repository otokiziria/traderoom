import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getTotalfigures = async () => {
  
  try{
    const res = await axios.get('/api/totalfigures');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getTotalfigure  = async (id) => {
  
  try{
    const res = await axios.get('/api/totalfigures/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveTotalfigures = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/totalfigures', body, config);
    if(res.data.status == 1){
      showAlertMSG('Total figure inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Total figure not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteTotalfigure = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/totalfigures/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Total figure deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Total figure not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
