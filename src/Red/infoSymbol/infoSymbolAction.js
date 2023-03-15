import {INFOSYMBOL} from './infoSymbolType';

export const getInfoSymbolAction  = (data=null)=>{
    return {
        type:INFOSYMBOL,
        payload:data
    }
}