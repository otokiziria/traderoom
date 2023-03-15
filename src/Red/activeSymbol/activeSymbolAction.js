import {ACTIVESYMBOL} from './activeSymbolType';

export const getActiveSymbolAction  = (data=null)=>{
    return {
        type:ACTIVESYMBOL,
        payload:data
    }
}