import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getWidget_symbol_profiles = async () => {
  
  try{
    const res = await axios.get('/api/widget-symbol-profile');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getWidget_symbol_profile  = async (id) => {
  
  try{
    const res = await axios.get('/api/widget-symbol-profile/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveWidget_symbol_profiles = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/widget-symbol-profile', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget symbol profile inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget symbol profile not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteWidget_symbol_profile = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/widget-symbol-profile/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget symbol profile deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget symbol profile not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
