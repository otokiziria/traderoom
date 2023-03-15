import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getOrders = async () => {
  
  try{
    const res = await axios.get('/api/orders');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getOrder  = async (id) => {
  
  try{
    const res = await axios.get('/api/orders/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveOrders = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/orders', body, config);
    if(res.data.status == 1){
      showAlertMSG('Order inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Order not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteOrder = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/orders/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Order deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Order not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
