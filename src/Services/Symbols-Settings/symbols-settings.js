import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getSymbolsSettings = async () => {
  
  try{
    const res = await axios.get('/api/symbols-settings');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}


export const getSymbolsSetting = async (id) => {
  
  try{
    const res = await axios.get('/api/symbols-settings/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveSymbolsSettings = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  console.log(body, "body data");
  try {
    const res = await axios.post('/api/symbols-settings', body, config);
    if(res.data.status == 1){
      showAlertMSG('SymbolsSetting inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('SymbolsSetting not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteSymbolsSetting = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/symbols-settings/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('SymbolsSetting deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('SymbolsSetting not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
