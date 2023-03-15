import {SYMBOLFILTER} from './symbolFilterType';

export const getSymbolFilterAction  = (data=null)=>{
    return {
        type:SYMBOLFILTER,
        payload:data
    }
}