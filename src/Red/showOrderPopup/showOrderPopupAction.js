import {SHOWORDERPOPUP} from './showOrderPopupType';

export const getShowOrderPopupAction  = (data=null)=>{
    return {
        type:SHOWORDERPOPUP,
        payload:data
    }
}