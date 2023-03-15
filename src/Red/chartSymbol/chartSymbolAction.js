import {CHARTSYMBOL} from './chartSymbolType';

export const getChartSymbolAction  = (data=null)=>{
    return {
        type:CHARTSYMBOL,
        payload:data
    }
}