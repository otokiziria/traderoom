import axios from "axios";
import { showErrors, showAlertMSG } from "../../Lib/helpers";
import {
  getSiteLoaderCountAction,
  getSiteLoaderAction,
  getLayoutDataAction,
  getLeftSideDataAction,
  getLeftSideSettingsAction,
  getHeaderDataAction,
  getSettingsAction,
  getEconomicCalendarDataAction,
  getFundamentalDataDataAction,
  getMarketOverviewDataAction,
  getSymbolProfileDataAction,
  getTechnicalAnalysisDataAction,
  getHistorySettingsAction,
  getPositionSettingsAction,
  getOrderSettingsAction,
  getTotalFigureSettingsAction,
  getLanguagesAction,
  getActiveCategoriesAction,
  getsiteThemeAction, 
  getoneClickTradingAction, 
  getActiveLanguageAction,
  getFavoriteSymbolsAction,
  getActiveInfoCategoriesAction,
  getHistoryDataAction,
  getAllSymbolsAction,
  getCurrencyAction,
  getSimpleTrade,
  getSimpleTradePercent
} from "../../Red";
import SocketMT5 from "../../Lib/socket/SocketMT5";
import SocketTicks from "../../Lib/socket/SocketTicks";
import store from "../../Red/store";
import i18n from "../../Languages/i18n";

let mt5SocketClient = null;
let globalName = 4031529;


let loaderCount = 0;
let compArr = [];

let PositionOrderingRequestCount = 0;

let compFunc = {
  header: getHeader,
  leftside: [getLeftSide, getLeftSideSettings],
  chart: getChart,
  widgets_economiccalendar: getEconomiccalendar,
  widgets_fundamentaldata: getFundamentaldata,
  widgets_marketoverview: getMarketoverview,
  widgets_symbolprofile: getSymbolprofile,
  widgets_technicalanalysis: getTechnicalanalysis,
  positions: [getPositionSettings, getPosition],
  histories: [getHistorySettings, getHistoryFromCrm],
  orders: [getOrderSettings, getOrder],
  totalfigures: [getTotalFigureSettings, getTotalFigure]
};

let compPlusData = {
  header: 1,
  leftside: 1,
  chart: 1,
  widgets_economiccalendar: 1,
  widgets_fundamentaldata: 1,
  widgets_marketoverview: 1,
  widgets_symbolprofile: 1,
  widgets_technicalanalysis: 1,
  positions: 2,
  histories: 2,
  orders: 2,
  totalfigures: 2,
};

export const getData = async () => {
  try {
    //const res = await axios.get("/api/Layouts/getactivelayout");
    //let data = res.data;

    getActiveLayouts();

    
    

    return true;
  } catch (err) {
    showErrors(err);
    return null;
  }
};
async function getActiveLayouts() {
  try {
    const res = await axios.get("/api/Layouts/getactivelayout");
    let data = res.data;

    if (data.status == 1) {
      let d = data.row;
      //console.log(d);
      let components = JSON.parse(d.components);

      for (var key in components) {
        // skip loop if the property is from prototype
        if (!components.hasOwnProperty(key)) continue;

        var obj = components[key];
        //console.log('obj ',components);
        for (var prop in obj) {
          // skip loop if the property is from prototype
          if (!obj.hasOwnProperty(prop)) continue;

          // your code
          
          if (!compArr.includes(obj[prop])) {
            compArr.push(obj[prop]);
            loaderCount = loaderCount + compPlusData[obj[prop]];
          }

          // console.log(prop + " = " + obj[prop]);
        }
      }

      // oto ai es chavsvi es kodi
      if(!compArr.includes('totalfigures')){
        compArr.push('totalfigures');
        loaderCount = loaderCount + compPlusData['totalfigures'];
      }
      // aq mtavrdeba es kodi

      //console.log("compArr.length = ", compArr.length)
      if (loaderCount > 0) {
        loaderCount = loaderCount + 7;
        store.dispatch(getSiteLoaderCountAction(loaderCount));
        for (var i = 0; i < compArr.length; i++) {
          if (typeof compFunc[compArr[i]] !== "undefined") {
            // compFunc[compArr[i]]();
            if (typeof compFunc[compArr[i]] == "object") {
              for (var j = 0; j < compFunc[compArr[i]].length; j++) {
                console.log(compArr[i], i);
                compFunc[compArr[i]][j]();
              }
            } else {
               console.log(compArr[i], i);
              await compFunc[compArr[i]]();
            }
          }
        }
        await getLanguages();
        await getCategories();
        await getCrmSettings();
        await getCrmFavorites();
        await getInfoCategories();
        await getCurrency();
      }
      store.dispatch(getLayoutDataAction(d));

      // console.log(components);
    } else {
      // aq unda gaketdes redirect mtavar saitze
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getChart() {
  //alert('chart');
  store.dispatch(
    getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
  );
}

async function getHeader() {
  //alert('header');
  try {
    const res = await axios.get(
      "/api/headers/getheaders/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getHeaderDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Header could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
 
}

export async function getSetting() {
  //alert('header');
  try {
    const res = await axios.get(
      "/api/settings/getsettings/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getSettingsAction(data.row));
      mt5SocketClient = SocketMT5();
      SocketTicks();
      //console.log("Left Side = ",data);
      //store.dispatch(
      //  getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      //);
    } else {
      showAlertMSG("Settings could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
 
}

async function getLeftSide() {
  try {
    const res = await axios.get("/api/symbols/getactivesymbols/");
    let data = res.data;
    //alert(data.status);
    if (data.status == 1) {
      store.dispatch(getLeftSideDataAction(data.row));
      store.dispatch(getAllSymbolsAction(data.row));
      //console.log("Left Side = ",data);
      //alert('leftside');
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Left side symbols could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getEconomiccalendar() {
  try {
    const res = await axios.get(
      "/api/widget-economic-calendar/geteconomiccalendar/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getEconomicCalendarDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Economic calendar could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }

  //alert('ec cal');
}

async function getFundamentaldata() {
  try {
    const res = await axios.get(
      "/api/widget-fundamental-data/getfundamentaldata/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getFundamentalDataDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Fundamental data could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getMarketoverview() {
  try {
    const res = await axios.get(
      "/api/widget-market-overview/getmarketoverview/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getMarketOverviewDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Market overview could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getSymbolprofile() {
  try {
    const res = await axios.get("/api/widget-symbol-profile/getsymbolprofile/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getSymbolProfileDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Symbol profile could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getTechnicalanalysis() {
  try {
    const res = await axios.get(
      "/api/widget-technical-analysis/gettechnicalanalysis/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getTechnicalAnalysisDataAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Technical analysis could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getTotalFigureSettings() {
  try {
    const res = await axios.get("/api/totalfigures/gettotalfigures/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getTotalFigureSettingsAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Total figures could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getTotalFigure() {
console.log('store.getState().customerAuth.customerAuth = ',store.getState().customerAuth.customerAuth);
  if (mt5SocketClient.readyState && 
    store.getState().customerAuth.customerAuth !== null && 
    store.getState().customerAuth.customerAuth !== undefined && 
    store.getState().customerAuth.customerAuth.user !== null &&
    store.getState().customerAuth.customerAuth.user !== undefined &&
    store.getState().customerAuth.customerAuth.user.user !== null &&
    store.getState().customerAuth.customerAuth.user.user !== undefined &&
    store.getState().customerAuth.customerAuth.user.user.ID !== null &&
    store.getState().customerAuth.customerAuth.user.user.ID !== undefined ) {
    mt5SocketClient.send('{"type":"getAccount","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
  } else {
    let posInt = setInterval(function () {
      if (mt5SocketClient.readyState&& 
        store.getState().customerAuth.customerAuth !== null && 
        store.getState().customerAuth.customerAuth !== undefined && 
        store.getState().customerAuth.customerAuth.user !== null &&
        store.getState().customerAuth.customerAuth.user !== undefined &&
        store.getState().customerAuth.customerAuth.user.user !== null &&
        store.getState().customerAuth.customerAuth.user.user !== undefined &&
        store.getState().customerAuth.customerAuth.user.ID !== null &&
        store.getState().customerAuth.customerAuth.user.ID !== undefined) {
        mt5SocketClient.send('{"type":"getAccount","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
        clearInterval(posInt);
      }
    }, 500);
  }
}

async function getPositionSettings() {
  try {
    const res = await axios.get("/api/positions/getpositions/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getPositionSettingsAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Positions could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getLeftSideSettings() {
  try {
    const res = await axios.get("/api/symbols-settings/getsymbolssettings/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getLeftSideSettingsAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Symbols settings could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}


async function getPosition() {
  //console.log('mt5SocketClient.readyState = ',mt5SocketClient.readyState);
  if(!PositionOrderingRequestCount&& 
    store.getState().customerAuth.customerAuth !== null && 
    store.getState().customerAuth.customerAuth !== undefined && 
    store.getState().customerAuth.customerAuth.user !== null &&
    store.getState().customerAuth.customerAuth.user !== undefined &&
    store.getState().customerAuth.customerAuth.user.user !== null &&
    store.getState().customerAuth.customerAuth.user.user !== undefined &&
    store.getState().customerAuth.customerAuth.user.user.ID !== null &&
    store.getState().customerAuth.customerAuth.user.user.ID !== undefined ){
    if (mt5SocketClient.readyState) {
      mt5SocketClient.send('{"type":"getPosition","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
    } else {
      let posInt = setInterval(function () {
        if (mt5SocketClient.readyState&& 
          store.getState().customerAuth.customerAuth !== null && 
          store.getState().customerAuth.customerAuth !== undefined && 
          store.getState().customerAuth.customerAuth.user !== null &&
          store.getState().customerAuth.customerAuth.user !== undefined &&
          store.getState().customerAuth.customerAuth.user.user !== null &&
          store.getState().customerAuth.customerAuth.user.user !== undefined &&
          store.getState().customerAuth.customerAuth.user.user.ID !== null &&
          store.getState().customerAuth.customerAuth.user.user.ID !== undefined ) {
          mt5SocketClient.send('{"type":"getPosition","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
          clearInterval(posInt);
        }
      }, 500);
    }
    PositionOrderingRequestCount = 1;
  }
  else{
    store.dispatch(
      getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
    );
  }
  
 // console.log("Need Socket");
}

async function getHistorySettings() {
  try {
    const res = await axios.get("/api/histories/gethistories/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getHistorySettingsAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Histories could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getHistory() {
  store.dispatch(
    getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
  );

}

async function getOrderSettings() {
  try {
    const res = await axios.get("/api/orders/getorders/");
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getOrderSettingsAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Orders could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
}

async function getOrder() {
  if(!PositionOrderingRequestCount){
    if (mt5SocketClient.readyState&& 
      store.getState().customerAuth.customerAuth !== null && 
      store.getState().customerAuth.customerAuth !== undefined && 
      store.getState().customerAuth.customerAuth.user !== null &&
      store.getState().customerAuth.customerAuth.user !== undefined &&
      store.getState().customerAuth.customerAuth.user.user !== null &&
      store.getState().customerAuth.customerAuth.user.user !== undefined &&
      store.getState().customerAuth.customerAuth.user.user.ID !== null &&
      store.getState().customerAuth.customerAuth.user.user.ID !== undefined ) {
        //store.getState().customerAuth.customerAuth.user.ID
      mt5SocketClient.send('{"type":"getPosition","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
    } else {
      let posInt = setInterval(function () {
        if (mt5SocketClient.readyState && 
          store.getState().customerAuth.customerAuth !== null && 
          store.getState().customerAuth.customerAuth !== undefined && 
          store.getState().customerAuth.customerAuth.user !== null &&
          store.getState().customerAuth.customerAuth.user !== undefined &&
          store.getState().customerAuth.customerAuth.user.user !== null &&
          store.getState().customerAuth.customerAuth.user.user !== undefined &&
          store.getState().customerAuth.customerAuth.user.user.ID !== null &&
          store.getState().customerAuth.customerAuth.user.user.ID !== undefined ) {
            //store.getState().customerAuth.customerAuth.user.ID
          mt5SocketClient.send('{"type":"getPosition","name":"'+store.getState().customerAuth.customerAuth.user.user.ID+'"}');
          clearInterval(posInt);
        }
      }, 500);
    }
    PositionOrderingRequestCount = 1;
  }
  else{
    store.dispatch(
      getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
    );
  }
}

async function getLanguages(){
  try {
    const res = await axios.get(
      "/api/lang_cat/getactivelanguages/"
    );
    let data = res.data;
    if (data.status == 1) {
      console.log('data = ',data);
      store.dispatch(getLanguagesAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Languages could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}

async function getCurrency(){
  try {
    const res = await axios.get(
      "/api/settings/getcurrency/"
    );
    let data = res.data;
    if (data.status == 1) {
      console.log('getCurrencyAction = ',data);
      store.dispatch(getCurrencyAction(data.rates));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Currency could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}

async function getCategories(){
  try {
    const res = await axios.get(
      "/api/symbols/getactivecategories/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getActiveCategoriesAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Categories could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}


async function getCrmFavorites(){
  try {
    const res = await axios.get(
      "/crm/favorites/"
    );
    let data = res.data;
    if (data.status == 1) {
      console.log('Favorites = ',data);
      //store.dispatch(getLanguagesAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getFavoriteSymbolsAction(data.row)
      );
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Favorites could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}

export async function getCrmSettings(){
  try {
    const res = await axios.get(
      "/crm/settings/"
    );
    let data = res.data;
    if (data.status == 1) {
      console.log('CRM Settings = ',data);
      //console.log(data.row)
      if(data.row.theme !== undefined){
        store.dispatch(
          getsiteThemeAction(data.row.theme)
        );
      }
      if(data.row.oneclicktrade !== undefined){
        store.dispatch(
          getoneClickTradingAction(data.row.oneclicktrade)
        );
      }
      if(data.row.language !== undefined){
        //i18n.changeLanguage(data.row.language);
        store.dispatch(
          getActiveLanguageAction(data.row.language)
        );
      }
      if(data.row.simpleTrade !== undefined){
        //i18n.changeLanguage(data.row.language);
        store.dispatch(
          getSimpleTrade(data.row.simpleTrade)
        );
      }
      if(data.row.simpleTradePercent !== undefined){
        //i18n.changeLanguage(data.row.language);
        store.dispatch(
          getSimpleTradePercent(data.row.simpleTradePercent)
        );
      }

      

      
     
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("CRM Settings could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}

async function getInfoCategories(){
  try {
    const res = await axios.get(
      "/api/symbols/getactivecategoriesforinfo/"
    );
    let data = res.data;
    if (data.status == 1) {
      store.dispatch(getActiveInfoCategoriesAction(data.row));
      //console.log("Left Side = ",data);
      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );
    } else {
      showAlertMSG("Categories could not be imported", 3);
    }

    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
  
}


const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


export  async function getHistoryFromCrm(start_date = '', end_date = '') {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let strd = start_date;
  let endd = end_date;
  if(end_date !== "" && end_date == ""){
    return false;
  }
  else if(end_date == "" && end_date !== ""){
    return false;
  }
  else if(start_date == '' && end_date == ''){

    var d = new Date();
    var e = new Date();
    strd = formatDate(d);
    e.setDate(d.getDate() + 1);
    endd = formatDate(e);
  }
  
  const body = JSON.stringify({start_date: strd, end_date: endd});
  try {
    const res = await axios.post('/crm/history', body, config);
    if(res.data.status == 1){
      //showAlertMSG('History deleted successfully', 1);
      console.log(res.data.row);
      store.dispatch(getHistoryDataAction(res.data.row));

      store.dispatch(
        getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
      );

    }
    else{
      showAlertMSG('History did not fetched from CRM', 3);
    }
  } catch (err) {
    showErrors(err);
  }
}
