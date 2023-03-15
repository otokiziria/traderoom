import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";

export const renewGroupPath = async () => {
  
  try{
    const res = await axios.get('/api/symbols/renewgrouppath');
    if(res.data.status == 1){
      showAlertMSG('Group paths updated succesfully', 1);
    }
    else{
      showAlertMSG('Group paths did not updated', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const updateGroupPath = async () => {
  
  try{
    const res = await axios.get('/api/symbols/updategrouppath');
    if(res.data.status == 1){
      showAlertMSG('Group paths updated succesfully', 1);
    }
    else{
      showAlertMSG('Group paths did not updated', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const renewGroup = async () => {
  
  try{
    const res = await axios.get('/api/symbols/renewgroup');
    
    if(res.data.status == 1){
      showAlertMSG('Groups updated succesfully', 1);
    }
    else{
      showAlertMSG('Groups did not updated', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const updateGroup = async () => {
  
  try{
    const res = await axios.get('/api/symbols/updategroup');
    
    if(res.data.status == 1){
      showAlertMSG('Groups updated succesfully', 1);
    }
    else{
      showAlertMSG('Groups did not updated', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const renewGroupData = async () => {
  
  try{
    const res = await axios.get('/api/symbols/renewgroupdata');
    
    if(res.data.status == 1){
      showAlertMSG(res.data.msg, 1);
    }
    else{
      showAlertMSG(res.data.msg, 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}
export const getGroupPaths = async () => {
  
  try{
    const res = await axios.get('/api/symbols/groupspath');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}
export const updateActiveSymbolData = async () => {
  try{
    const res = await axios.get('/api/symbols/updateactivesymbol');
    
    if(res.data.status == 1){
      showAlertMSG('Active symbols updated succesfully', 1);
    }
    else{
      showAlertMSG('Active symbols did not updated', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const sendActiveSymbolMT5 = async () => {
  try{
    const res = await axios.get('/api/symbols/sendactivesymbolmt5');
    
    if(res.data.status == 1){
      showAlertMSG('Active symbols sent succesfully', 1);
    }
    else{
      showAlertMSG('Active symbols did not send', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}

export const sendActiveSymbolTick = async () => {
  try{
    const res = await axios.get('/api/symbols/sendactivesymboltick');
    
    if(res.data.status == 1){
      showAlertMSG('Active symbols send succesfully', 1);
    }
    else{
      showAlertMSG('Active symbols did not send', 3);
    }
  }
  catch(err){
    showErrors(err);
 }
}