import {ALLSYMBOLS} from './allSymbolsType';

export const getAllSymbolsAction  = (data=null)=>{
    return {
        type:ALLSYMBOLS,
        payload:data
    }
}