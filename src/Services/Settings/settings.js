import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getSettings = async () => {
  
  try{
    const res = await axios.get('/api/settings');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getSetting  = async (id) => {
  
  try{
    const res = await axios.get('/api/settings/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const uploadFavicon = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("myImage", data);
  try {
    const res = await axios.post("/api/uploadfavicon", formData, config);
    console.log(res.data);
    //return false;
    if (res.data.status == 1) {
      return res.data;
    } else {
      showAlertMSG("Image not uploaded", 3);
      return res.data;
    }
  } catch (err) {
    showErrors(err);
    return false;
  }
};

export const saveSettings = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/settings', body, config);
    if(res.data.status == 1){
      showAlertMSG('Setting inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Setting not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteSetting = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/settings/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Setting deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Setting not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
