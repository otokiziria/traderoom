import {HISTORYDATA} from './historyDataType';

export const getHistoryDataAction  = (data=null)=>{
    return {
        type:HISTORYDATA,
        payload:data
    }
}