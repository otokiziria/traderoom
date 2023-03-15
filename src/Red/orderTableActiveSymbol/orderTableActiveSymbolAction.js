import {ORDERTABLEACTIVESYMBOL} from './orderTableActiveSymbolType';

export const getOrderTableActiveSymbolAction  = (data=null)=>{
    return {
        type:ORDERTABLEACTIVESYMBOL,
        payload:data
    }
}