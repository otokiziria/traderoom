import {CURRENCY} from './currencyType';

export const getCurrencyAction  = (data=null)=>{
    return {
        type:CURRENCY,
        payload:data
    }
}