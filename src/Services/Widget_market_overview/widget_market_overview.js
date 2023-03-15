import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getWidget_market_overviews = async () => {
  
  try{
    const res = await axios.get('/api/widget-market-overview');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getWidget_market_overview  = async (id) => {
  
  try{
    const res = await axios.get('/api/widget-market-overview/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveWidget_market_overviews = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/widget-market-overview', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget market overview inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget market overview not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteWidget_market_overview = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/widget-market-overview/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget market overview deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget market overview not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
