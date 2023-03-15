import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getWidget_economic_calendars = async () => {
  
  try{
    const res = await axios.get('/api/widget-economic-calendar');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getWidget_economic_calendar  = async (id) => {
  
  try{
    const res = await axios.get('/api/widget-economic-calendar/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveWidget_economic_calendars = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/widget-economic-calendar', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget economic calendar inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget economic calendar not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteWidget_economic_calendar = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/widget-economic-calendar/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Widget economic calendar deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Widget economic calendar not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
