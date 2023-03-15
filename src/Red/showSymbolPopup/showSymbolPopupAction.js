import {SHOWSYMBOLPOPUP} from './showSymbolPopupType';

export const getShowSymbolPopupAction  = (data=null)=>{
    return {
        type:SHOWSYMBOLPOPUP,
        payload:data
    }
}