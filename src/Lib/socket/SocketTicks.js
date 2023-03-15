import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getTicksAction } from "../../Red";
import store from "../../Red/store";

let sockInit = null;

function SocketTicks() {
  if (sockInit !== null) {
    return sockInit;
  }
  //console.log('store.getState().settings.settings = ', store.getState().settings.settings);
  let url = store.getState().settings.settings.traderoom_url.replace('https://', 'wss://')
  const client = new W3CWebSocket(url.replace('http://', 'wss://')+'/ticks')//("ws://5.189.171.245:1220"); //new W3CWebSocket('wss://mycoinbanking-traderoom.com/ticks');
  client.onopen = function () {
    client.send('{"type":"Ticks"}');
  };
  client.onmessage = ({ data }) => {
    let parseData = JSON.parse(data);

    if (parseData !== undefined) {
      if (parseData.length > 0) {
        parseData.forEach((row) => {
          try {
            store.dispatch(getTicksAction(row.Value));
          } catch (err) {
            console.log(err);
          }
        }) 
      }
    }
  };
  sockInit = client;
  return client;
}

export default SocketTicks;
