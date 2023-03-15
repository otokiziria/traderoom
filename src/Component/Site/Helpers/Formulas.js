
export const symbolMinMaxStepDivider = 10000;

export function getMin(value) {
    return value / symbolMinMaxStepDivider;
}

export function getMax(value) {
    return value / symbolMinMaxStepDivider;
}

export function getDigitStep(digit) {
    return (parseInt(digit) !== 0) ? 1 / Math.pow(10, parseInt(digit)) : 1;
}

export function getStep(value) {
    return value / symbolMinMaxStepDivider;
}

export function getSpread(value) {
    return value / symbolMinMaxStepDivider;
}

export function calculateMargin(Lot, contractSize, margin_value, currentPrice, currency) {
    return (Lot * contractSize * margin_value * currentPrice * currency / 100).toFixed(2);
}

export function calculateDaylyChange(ask, dayly_ask) {
    return ((ask - dayly_ask) / dayly_ask).toFixed(2);
}

export function calculateSpread(ask, bid, point) {
    return ((ask - bid) * point).toFixed(2)
}

export function calculateLeverage(margin_value) {
    return (1 / (margin_value / 100)).toFixed(2);
}

export function calculatePointValue(Lot, contractSize, point, currency, myCurrency) {
    //console.log('myCurrency = ', myCurrency);
    if (myCurrency !== null) {
        return (Lot * contractSize * point * currency * (currency * (1 / myCurrency))).toFixed(4); // aq aris shesacvleli grupis currency unda wamoigos
    }
    return (Lot * contractSize * point * currency * (currency * (1 / currency))).toFixed(4); // aq aris shesacvleli grupis currency unda wamoigos
}

export function calculatePointAway(isAsk, isSl, profit, pointValue) {
    if ((isAsk && isSl) || (!isAsk && isSl)) {
        return parseInt(Math.abs((parseFloat(profit) / parseFloat(pointValue))));
    }
    else {
        return parseInt((parseFloat(profit) / parseFloat(pointValue)).toFixed(2));
    }
}

export function calculateProfitFromPointAway(PointAway, pointValue, fixed = 2) {
    return (parseFloat(PointAway) * parseFloat(pointValue)).toFixed(fixed);
}

export function calculateBalancePercent(isAsk, isSl, profit, Balance, fixed = 2) {
    if ((isAsk && isSl) || (!isAsk && isSl)) {
        return Math.abs(((parseFloat(profit) / parseFloat(Balance) * 100)).toFixed(fixed));
    }
    else {
        return ((parseFloat(profit) / parseFloat(Balance) * 100)).toFixed(fixed);
    }

}

export function calculateProfitFromBalancePercent(isSl, Balance, BalancePer, fixed = 2) {
    if (isSl) {
        return -1 * ((parseFloat(BalancePer) * parseFloat(Balance) / 100)).toFixed(fixed);
    }
    else {
        return ((parseFloat(BalancePer) * parseFloat(Balance) / 100)).toFixed(fixed);
    }

}

export function calculatePrice(isAsk, isSl, AskBid, pointAway, digits = 2) {
    if ((isAsk && isSl) || (!isAsk && !isSl)) {
        return parseFloat(parseFloat(AskBid) - parseFloat(pointAway) / parseFloat(Math.pow(10, parseInt(digits)))).toFixed(digits);
    }
    else {
        return parseFloat(parseFloat(AskBid) + parseFloat(pointAway) / parseFloat(Math.pow(10, parseInt(digits)))).toFixed(digits);
    }
}

export function calculateProfit(isSL, pointAway, pointValue, fixed = 2) {
    if (isSL) {
        return parseFloat(-1 * parseFloat(pointAway) * parseFloat(pointValue)).toFixed(fixed);
    }
    else {
        return parseFloat(parseFloat(pointAway) * parseFloat(pointValue)).toFixed(fixed);
    }

}

export function calculateProfitFromPrice(isAsk, isSl, price, askBid, pointValue, digits = 2) {
    let profit = 0;
    if ((isAsk && isSl) || (!isAsk && !isSl)) {
        profit = parseFloat(parseFloat(askBid) - parseFloat(price)) / (1 / parseFloat(Math.pow(10, parseInt(digits)) * parseFloat(pointValue))).toFixed(digits);
    }
    else {
        profit = parseFloat(parseFloat(price) - parseFloat(askBid)) / (1 / parseFloat(Math.pow(10, parseInt(digits)) * parseFloat(pointValue))).toFixed(digits);
    }
    if (isSl) {
        return -1 * profit;
    }
    return profit;
}

export function calculatePriceFromProfit(isAsk, isSl, AskBid, pointAway, digits = 2) {
    if ((isAsk && isSl) || (!isAsk && !isSl)) {
        return parseFloat(parseFloat(AskBid) - parseFloat(pointAway) / (parseFloat(Math.pow(10, parseInt(digits)) * parseFloat(Math.pow(10, parseInt(digits)))))).toFixed(digits);
    }
    else {
        return parseFloat(parseFloat(AskBid) + parseFloat(pointAway) / (parseFloat(Math.pow(10, parseInt(digits)) * parseFloat(Math.pow(10, parseInt(digits)))))).toFixed(digits);
    }

}

export function calculateLotForMt5(lot) {
    return lot * symbolMinMaxStepDivider;
}

export function calculateLotFromMt5(lot) {
    return lot / symbolMinMaxStepDivider;
}

export function percentOf(a, b, fixed = 2) {
    return (a != 0) ? parseFloat((100 - a * 100 / b)).toFixed(fixed) : 0;
}

export function sybstractionOf(a, b, fixed = 2) {
    return parseFloat(a - b).toFixed(fixed);
}

export function isTradingSessionOk(info) {
    var d = new Date();
    var week_n = d.getUTCDay();
    var hour = d.getUTCHours();
    var minute = d.getUTCMinutes();
    var into_minutes = hour * 60 + minute;
   
    let ret = true;
    if (info !== "") {
        let data = info.split(" || ");
        if (data.length > 0) {
            data.forEach((row) => {
                let k_r = row.split(" = ");
                if (k_r.length > 0) {
                   
                    if (k_r !== undefined && k_r[0] !== undefined && k_r[1] !== undefined) {
                        if (k_r[0] == week_n) {

                            var start_end = k_r[1].split(' - ');
                            if (start_end.length == 2) {
                                var s_hour_minute = start_end[0].split(':');
                                var s_hour = parseInt(s_hour_minute[0]);
                                var s_minute = parseInt(s_hour_minute[1]);
                                var into_s_minutes = s_hour * 60 + s_minute;
                                var e_hour_minute = start_end[1].split(':');
                                var e_hour = parseInt(e_hour_minute[0]);
                                var e_minute = parseInt(e_hour_minute[1]);
                                var into_e_minutes = e_hour * 60 + e_minute;
                                //return into_minutes >= into_s_minutes && into_minutes <= into_e_minutes;
                                if (into_minutes >= into_s_minutes && into_minutes <= into_e_minutes) {
                                    ret = true;
                                }
                                else {
                                    ret = false;
                                }
                            }
                        }
                    }
                }
            })
        }

    }

    return ret;
}

export function isImpleTrade(simpleTrade, simpleTradePercent, totalFigureData) {
    if (
        simpleTrade !== null &&
        simpleTrade !== undefined &&
        simpleTrade == 2 &&
        simpleTradePercent !== null &&
        simpleTradePercent !== undefined &&
        totalFigureData !== null &&
        totalFigureData !== undefined &&
        totalFigureData.MarginFree !== undefined
    ) {
        return true;
    }
    return false;
}

export function simpleTradeValue(MarginFree, simpleTradePercent, category, contractSize, margin_value, min, max, step, currentPrice, usd, accountCurrency, currencyRate) {
   // console.log(MarginFree, simpleTradePercent, category, contractSize, margin_value, min, max, step, currentPrice, usd, accountCurrency, currencyRate);
    
    let accCurrency = parseFloat(currencyRate[accountCurrency]).toFixed(5);
    
    let firstVal = MarginFree * simpleTradePercent / 100 * accCurrency;

    let secondVal = 0;
    //console.log('firstVal = ',firstVal);
    //console.log('sss = ',contractSize * usd * margin_value);
    if(category == 17 || category == 18 || category == 19 || category == 20){
         secondVal = (firstVal / (contractSize * usd * margin_value)).toFixed(Math.abs(Math.log10(step)));
    }
    else{
        secondVal = (firstVal / (contractSize * usd * margin_value * currentPrice)).toFixed(Math.abs(Math.log10(step)));
    }

    //console.log(firstVal, contractSize, usd, margin_value);
    //console.log('secondVal',secondVal);
    let returnedValue = 0;
    if(parseFloat(secondVal) < parseFloat(min)){
        returnedValue = parseFloat(min);
    }
    else if(parseFloat(secondVal) > parseFloat(max)){
        returnedValue = parseFloat(max);
    }
    else{
        returnedValue = parseFloat(secondVal);
    }
    //console.log('returnedValue',returnedValue);
    return returnedValue;
}
