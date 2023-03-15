import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getWidget_fundamental_datas = async () => {
  
  try{
    const res = await axios.get('/api/widget-fundamental-data');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getWidget_fundamental_data  = async (id) => {
  
  try{
    const res = await axios.get('/api/widget-fundamental-data/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveWidget_fundamental_datas = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/widget-fundamental-data', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget fundamental data inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget fundamental data not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteWidget_fundamental_data = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/widget-fundamental-data/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget fundamental data deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget fundamental data not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
