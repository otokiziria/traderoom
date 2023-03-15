import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getLangCats = async () => {
  
  try{
    const res = await axios.get('/api/lang_cat');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getLangCat  = async (id) => {
  
  try{
    const res = await axios.get('/api/lang_cat/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveLangCats = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/lang_cat', body, config);
    if(res.data.status == 1){
      showAlertMSG('Language Category inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Language Category not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteLangCat = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/lang_cat/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Language Category deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Language Category not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
