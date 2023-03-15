import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getRefreshPageAction, getLeftSideDataAction, getFavoriteSymbolsAction } from "../../Red";

import store from "../../Red/store";

export const getSymbols = async () => {
  
  try{
    const res = await axios.get('/api/symbols');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
 }
}

export const getSymbol = async (id) => {
  
  try{
    const res = await axios.get('/api/symbols/show/'+id);
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}


export const saveSymbol = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/api/symbols', body, config);
    if(res.data.status == 2){
      showAlertMSG('Symbol already inserted', 2);
    }
    else if(res.data.status == 1){
      showAlertMSG('Symbol inserted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Symbol not inserted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getActiveSymbols = async () => {
  
  try{
    const res = await axios.get('/api/symbols/active');
    let data = res.data;
    return data;
  }
  catch(err){
    showErrors(err);
    return null;
 }
}

export const deleteSymbol = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    const res = await axios.post('/api/symbols/delete', body, config);
    if(res.data.status == 1){
      showAlertMSG('Symbol deleted successfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Symbol not deleted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const sortSymbols = async (id, was, value) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id, was: was, value:value});
  try {
    const res = await axios.post('/api/symbols/sortsymbols', body, config);
    if(res.data.status == 1){
      showAlertMSG('Symbols sorted succesfully', 1);
      store.dispatch(getRefreshPageAction(true));
    }
    else{
      showAlertMSG('Symbols not sorted', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getActiveFilterSymbols = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: id});
  try {
    console.log('DMACHIREEEEES');
    const res = await axios.post('/api/symbols/filter', body, config);
    let data = res.data;
    //alert(data.status);
    if (data.status == 1) {
      store.dispatch(getLeftSideDataAction(data.row));
    }
    else if(data.status == 2){
      store.dispatch(getLeftSideDataAction([{total: 0}]));
    }
    else{
      showAlertMSG('Can not fetch symbols', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getActiveFilterFavoriteSymbols = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({id: 0});
  try {
    console.log('DMACHIREEEEES');
    const res = await axios.post('/api/symbols/filter', body, config);
    let data = res.data;
    //alert(data.status);
    if (data.status == 1) {
      store.dispatch(getLeftSideDataAction(data.row));
    }
    else if(data.status == 2){
      store.dispatch(getLeftSideDataAction([{total: 0}]));
    }
    
    else{
      showAlertMSG('Can not fetch symbols', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}

export const getActiveSearchSymbols = async (symbol, type, id = 0) => {
  //console.log('TYPE = ', type);
  if(type == 1){
    let pointerData = [];
    if(typeof store.getState().leftSideData.leftSideData == 'object'){
      pointerData = store.getState().leftSideData.leftSideData;
    }
    else{
      pointerData = JSON.parse(store.getState().leftSideData.leftSideData);
    }
    console.log(store.getState().leftSideData.leftSideData);
    if(pointerData.length > 0){
      let dataArr = [];
      pointerData.forEach((el) => {
        if(store.getState().favoriteSymbols.favoriteSymbols.includes(el.symbol) && el.symbol.includes(symbol)){
          dataArr.push(el);
        }
      });

      if(dataArr.length > 0){
        store.dispatch(getLeftSideDataAction(dataArr));
      }
      else{
        store.dispatch(getLeftSideDataAction([{total: 0}]));
      }

    }
  }
  else{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({symbol:symbol,id: id});
    try {
      const res = await axios.post('/api/symbols/search', body, config);
      let data = res.data;
      //alert(data.status);
      if (data.status == 1) {
        store.dispatch(getLeftSideDataAction(data.row));
        
      }
      else if(data.status == 2){
        store.dispatch(getLeftSideDataAction([{total: 0}]));
      }
      else{
        showAlertMSG('Can not fetch symbols', 3);
      }
    } catch (err) {
      showErrors(err);
    }
  }
  
}

export const getLeftSide = async () => {
  try {
    const res = await axios.get("/api/symbols/getactivesymbols/");
    let data = res.data;
    //alert(data.status);
    if (data.status == 1) {
      store.dispatch(getLeftSideDataAction(data.row));
      
     
    } else {
      showAlertMSG("Left side symbols could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}


export const saveToFavorites = async (id, symbol, insert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const body = JSON.stringify({email: id, symbol: symbol, insert: insert});
  try {
    const res = await axios.post("/crm/favorites", body, config);
    if (res.data.status == 1) {
      let fv = [];
      if(typeof store.getState().favoriteSymbols.favoriteSymbols == 'object'){
        store.getState().favoriteSymbols.favoriteSymbols.forEach((el) => {
          fv.push(el);
        })
        
      
      }
      else{
        JSON.parse(store.getState().favoriteSymbols.favoriteSymbols).forEach((el) => {
          fv.push(el);
        })
       
      }
      if(insert){
        fv.push(symbol)
      }
      else{
        let fvIndex = fv.indexOf(symbol);
        if (fvIndex > -1) {
          fv.splice(fvIndex, 1);
        }
      }
      console.log(fv, store.getState().favoriteSymbols.favoriteSymbols);
      
      store.dispatch(
        getFavoriteSymbolsAction(fv)
      );
        return {status: 1}
    } else {
      showAlertMSG("Favorite not inserted", 3);
      return {status: 0}
    }
  } catch (err) {
    showErrors(err);
    return {status: 0}
  }
}