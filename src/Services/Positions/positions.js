import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getPositions = async () => {
  
  try{
    const res = await axios.get('/api/positions');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getPosition  = async (id) => {
  
  try{
    const res = await axios.get('/api/positions/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const savePositions = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/positions', body, config);
    if(res.data.status == 1){
      showAlertMSG('Position inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Position not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deletePosition = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/positions/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Position deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Position not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
