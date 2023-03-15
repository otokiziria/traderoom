import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  getSiteLoaderAction,
  getTotalFigureDataAction,
  getOrderDataAction,
  getPositionDataAction,
} from "../../Red";
import store from "../../Red/store";

let sockInit = null;

let firstTimePositions = true;
let firstTimeAccount = true;

function SocketMT5() {
  if (sockInit !== null) {
    return sockInit;
  }
  //console.log('sockInit');
  let url = store.getState().settings.settings.traderoom_url.replace('https://', 'wss://')

  const client = new W3CWebSocket(url.replace('http://', 'wss://')+'/v2');//("ws://5.189.171.245:1221"); // "wss://46.101.207.118/v2" new W3CWebSocket('wss://mycoinbanking-traderoom.com/v2');
  client.onopen = function () {
    //client.send('{"type":"GetLastTicks"}');
  };
  client.onmessage = ({ data }) => {
    let parseData = JSON.parse(data);
   // console.log(parseData);
    if (parseData) {
      //GetBalance
      if (
        parseData.getAccount !== null &&
        parseData.getAccount !== undefined
      ) {
        try {
          
          store.dispatch(getTotalFigureDataAction(parseData.getAccount));
          if (firstTimePositions) {
            store.dispatch(
              getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
            );
            firstTimePositions = false;
          }
        } catch (err) {
          console.log(err);
        }
      }
      //    getPosition
      if (
        parseData.getPosition !== null &&
        parseData.getPosition !== undefined
      ) {
        try {
          store.dispatch(getPositionDataAction(parseData.getPosition));
          if (firstTimeAccount) {
            //console.log('store.getState().siteLoader.siteLoader = ', store.getState().siteLoader.siteLoader);
            store.dispatch(
              getSiteLoaderAction(store.getState().siteLoader.siteLoader + 1)
            );
            firstTimeAccount = false;
          }
        } catch (err) {
          console.log(err);
        }
      }
      //    getPendingOrders
      if (
        parseData.getOrderPending !== null &&
        parseData.getOrderPending !== undefined
      ) {
        try {
          //console.log('asdasd ',parseData.getOrderPending);
          if(parseData.getOrderPending !== null){
            store.dispatch(getOrderDataAction(parseData.getOrderPending));
          }
          
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  sockInit = client;
  return client;
}

export default SocketMT5;
