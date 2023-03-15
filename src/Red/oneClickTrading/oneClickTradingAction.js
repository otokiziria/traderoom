import {ONECLICKTRADING} from './oneClickTradingType';

export const getoneClickTradingAction  = (data=null)=>{
    return {
        type:ONECLICKTRADING,
        payload:data
    }
}