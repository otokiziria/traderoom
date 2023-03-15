import {CHARTHISTORYDATA} from './chartHistoryDataType';

export const getChartHistoryDataAction  = (data=null)=>{
    return {
        type:CHARTHISTORYDATA,
        payload:data
    }
}