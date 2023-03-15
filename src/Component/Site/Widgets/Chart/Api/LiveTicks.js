import store from "../../../../../Red/store";

window.WebSocket = window.WebSocket || window.MozWebSocket;

var _subs = []
var currSymbol = ''
 
export default {
    subscribeBars: function(symbolInfo, resolution, updateCb, uid, resetCache,history) {        
        currSymbol = symbolInfo.name.split(/[:/]/);
        
        // console.log(uid);
        
        const channelString = createChannelString(currSymbol[1]);

        var newSub = {
            channelString, 
            uid,
            resolution,
            symbolInfo,
            lastBar: (history[currSymbol[1]] != undefined && history[currSymbol[1]].lastBar != undefined) ? history[currSymbol[1]].lastBar : [],
            listener: updateCb,
        }
         //console.log(history[currSymbol[1]],'<---');
       
         _subs.push(newSub)
    },
    unsubscribeBarswut: function(uid) {
        var subIndex = _subs.findIndex(e => e.uid == uid)
        if (subIndex == -1) {
            return
        }
        var sub = _subs[subIndex]
        _subs.splice(subIndex, 1)
    }
}

    store.subscribe(() => {
        const _data=store.getState().ticks.ticks
            var Rname = currSymbol[1]
    
    
        if (_data) {
            
            var gela = _data;
            
            if (gela.symbol == Rname) {
    
                const data = {
                    sub_type: 0,
                    exchange: Rname,
                    to_sym: Rname,
                    from_sym: Rname,
                    trade_id: gela.datetime,
                    ts: gela.datetime,
                    volume: 0,
                    price: gela.ask
                }
    
    
                const channelString = `${data.sub_type}~${data.exchange}~${data.to_sym}~${data.from_sym}`;                
                const sub = _subs.find(e => e.channelString === channelString);
                // console.log(channelString,'====',sub);
                
                
                if (sub) {
                    if (data.ts < sub.lastBar.time / 1000) {
                        return
                    }
                    var _lastBar = updateBar(data, sub)
    
                    sub.listener(_lastBar)
                    sub.lastBar = _lastBar
                }
    
            }
        }
    })


// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {

    var lastBar = sub.lastBar
    let resolution = sub.resolution
    if (resolution.includes('D')) {
        resolution = 1440
    } else if (resolution.includes('W')) {
        resolution = 10080
    }
    var coeff = resolution * 60
    var rounded = Math.floor(data.ts / coeff) * coeff
    var lastBarSec = lastBar.time / 1000
    var _lastBar

    if (rounded > lastBarSec) {

        // create a new candle, use last close as open **PERSONAL CHOICE**
        _lastBar = {
            time: rounded * 1000,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: data.price,
            volume: data.volume
        }

    } else {

        // update lastBar candle!
        if (data.price < lastBar.low) {
            lastBar.low = data.price
        } else if (data.price > lastBar.high) {
            lastBar.high = data.price
        }

        lastBar.volume += data.volume
        lastBar.close = data.price
        _lastBar = lastBar
    }
    return _lastBar
}

// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo) {
    // console.log(symbolInfo,'<=======Info');

    var channel = symbolInfo;
    const exchange = channel === 'GDAX' ? 'Coinbase' : channel
    const to = channel
    const from = channel
    // subscribe to the CryptoCompare trade channel for the pair and exchange
    return `0~${exchange}~${from}~${to}`
}


