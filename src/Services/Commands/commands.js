import axios from "axios";
import {showErrors, showAlertMSG} from "../../Lib/helpers";
import { getChartHistoryDataAction  } from "../../Red";
import store from "../../Red/store";
import jsonMSG from "./requestMessages.json"
import jsonRetCodeMSG from "./returnCodes.json"

export const requestCommand = async (data, showMessage = true) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/metatrader/command', body, config);
    console.log(res);
    if(showMessage){
      let success = 1;
      if(showMessage != 'MT_RET_OK' && showMessage != 'MT_RET_REQUEST_ACCEPTED' && showMessage != 'MT_RET_REQUEST_DONE' && showMessage != 'MT_RET_REQUEST_PROCESS'){
        success = 3
      }
      let msg = '';
      if(jsonMSG[res.data[data.command]] !== undefined){
        msg = jsonMSG[res.data[data.command]];
      }
      else if(jsonRetCodeMSG[res.data[data.command]] !== undefined){
        msg = jsonRetCodeMSG[res.data[data.command]];
      }
      console.log(data.command, res.data);
      console.log(msg, res.data[data.command], res, data );
      // showAlertMSG((msg !== "") ? msg : res[data.command], success);
    }
    
  } catch (err) {
    showErrors(err);
  }
}

export const chartHistoryCommand  = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post('/metatrader/command', body, config);
    console.log('res = ', typeof res)
    if(typeof res.data == 'object'){
      //console.log(res.data)
      store.dispatch(getChartHistoryDataAction(res.data));
    }
    else{
      console.log('CHART HISTORY DATA = ', res);
    }
    
  } catch (err) {
    console.log(err);
    showErrors(err);
  }
}
