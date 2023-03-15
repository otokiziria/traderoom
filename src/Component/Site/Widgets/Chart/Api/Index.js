import store from "../../../../../Red/store";
import liveTicks from "./LiveTicks";
import { chartHistoryCommand } from "../../../../../Services/Commands/commands";

// let client=null;
// let interval=setInterval(()=>{
// 		if(chart!==undefined){
// client=chart;
// 		clearInterval(interval)
// 	}
// },1000)

const history = {};
const supportedResolutions = ["1", "3", "5", "15", "30", "60", "D"];

const config = {
  supported_resolutions: supportedResolutions,
};

let chartTheme = '';

var _subs = [];
let previus_chart = null;
let symbolFrom = null;
let isSocketExists = false;
let isSubscribed = false;
let globalOnHistoryCallback;
let globalOnErrorCallback;

export default {
  history: history,

  onReady: (cb) => {
    cb(config)
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    var split_data = symbolName.split(/[:/]/);
    var symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      timezone: "UTC",
      ticker: symbolName,
      exchange: split_data[0],
      minmov: 1,
      has_intraday: true,
      intraday_multipliers: ["1", "60", "D"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      legs: [symbolName],
      data_status: "streaming",
    };

    symbol_stub.pricescale = 100000;

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },

  getBars: async function (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    console.log("symbolInfo", symbolInfo);
    var split_symbol = symbolInfo.name.replace("Symbol:", ""); //'Symbol:AUDCAD',
    let dt = {};
    let formatted_date = from - 2 * 24 * 60 * 60;
    console.log(resolution);
    if (resolution == "60") {
      dt = {
        command: "getHistory",
        data: { symbol: split_symbol, from: from, to: to, c_type: 'h'},
      };
    }
    if (resolution == "1D") {
      dt = {
        command: "getHistory",
        data: { symbol: split_symbol, from: from, to: to, c_type: 'd' },
      };
    }
    if (resolution == "D") {
      dt = {
        command: "getHistory",
        data: { symbol: split_symbol, from: from, to: to, c_type: 'd' },
      };
    }
    if (resolution == "1") {
      dt = {
        command: "getHistory",
        data: { symbol: split_symbol, from: formatted_date, to: to },
      };
    }
    if(firstDataRequest ){ //|| chartTheme != store.getState().siteTheme.siteTheme
      // pirvel pages chatvirtvaze unda await tore subscribe uswrebs datis wamogeba da wers time is null
      if(Object.keys(history).length == 0){ // || chartTheme != store.getState().siteTheme.siteTheme
       // chartTheme = store.getState().siteTheme.siteTheme;
        await chartHistoryCommand(dt);
      }
      //simbolos shecvlis dros await ar unda imitom rom subscribes ar aketebs saertod rato ar vici
      else{
       chartHistoryCommand(dt);
      }
      
    }
    //dapataraveba gadmopataravebashi ar damchirvebia jer await
    else{
      chartHistoryCommand(dt);
    }
     

    symbolFrom = split_symbol;

    globalOnHistoryCallback = onHistoryCallback;
    globalOnErrorCallback = onErrorCallback;

    if (!isSubscribed) {
      let br;
      store.subscribe(() => {
        isSubscribed = true;
        symbolFrom =
          store.getState().chartSymbol.chartSymbol === null ||
          store.getState().chartSymbol.chartSymbol.symbol === undefined ||
          store.getState().chartSymbol.chartSymbol.symbol === null
            ? "AUDCAD"
            : store.getState().chartSymbol.chartSymbol.symbol;
        if (
          store.getState().chartHistoryData === undefined ||
          store.getState().chartHistoryData.chartHistoryData === undefined
        ) {
          return {
            time: 0,
            low: parseFloat(0.19),
            high: parseFloat(0),
            open: parseFloat(0),
            close: parseFloat(0),
            volume: 0,
          };
        }

        if (
          previus_chart != store.getState().chartHistoryData.chartHistoryData
        ) {
          previus_chart = store.getState().chartHistoryData.chartHistoryData;
          let g = previus_chart;
          br = g.map((el, k) => {
            return {
              time: el.datetime * 1000,
              low: parseFloat(el.low),
              high: parseFloat(el.high),
              open: parseFloat(el.open),
              close: parseFloat(el.close),
              volume: 0,
            };
          });

          if (firstDataRequest) {
            var lastBar = br[br.length - 1];
            history[symbolFrom] = { lastBar: lastBar };
          }
          console.log(history);
          if (br.length > 0) {
            getNewBars(br, { noData: true });
          } else {
            getNewBars(br, { noData: true });
          }
          return br;
        }
      });
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log("subscribeBars symbolInfo : ", symbolInfo);
    liveTicks.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
      history
    );
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log('UNSUBSCRIBE');
    liveTicks.unsubscribeBarswut(subscriberUID);
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //console.log('Calc Deep =============');

    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //NULL
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    // console.log('=====getTimeScaleMarks running')
  },
  getServerTime: (cb) => {
    // console.log('=====getServerTime running')
  },
};

async function getNewBars(br, obj) {
  if (br.length > 0) {
    /*
.catch(err => {
    console.log({err})
    onErrorCallback(err)
   })
    */
    try{
      console.log(br.length);
      await globalOnHistoryCallback(br, { noData: false });
    }
    catch(err){
      console.log(err);
      await globalOnErrorCallback(err)
    }
  } else {
    globalOnHistoryCallback(br, { noData: true });
  }
  console.log(br.length);
  return br;
}
