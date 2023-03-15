import {SHOWPOSITIONPOPUP} from './showPositionPopupType';

export const getShowPositionPopupAction  = (data=null)=>{
    return {
        type:SHOWPOSITIONPOPUP,
        payload:data
    }
}