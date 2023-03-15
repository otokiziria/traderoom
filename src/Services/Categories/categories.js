import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction  } from "../../Red";
import store from "../../Red/store";

export const getCategories = async () => {
  
  try{
    const res = await axios.get('/api/categories');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getSortedCategories = async () => {
  
  try{
    const res = await axios.get('/api/categories/sorted');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const getCategory = async (id) => {
  
  try{
    const res = await axios.get('/api/categories/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const saveCategories = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/categories', body, config);
    if(res.data.status == 1){
      showAlertMSG('Category inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Category not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const deleteCategory = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/categories/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Category deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Category not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const uploadImages = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("myImage", data);
  try {
    const res = await axios.post("/api/uploadfile", formData, config);
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
