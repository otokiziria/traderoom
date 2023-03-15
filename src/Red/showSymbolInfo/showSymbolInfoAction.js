import {SHOWSYMBOLINFO} from './showSymbolInfoType';

export const getShowSymbolInfoAction  = (data=null)=>{
    return {
        type:SHOWSYMBOLINFO,
        payload:data
    }
}