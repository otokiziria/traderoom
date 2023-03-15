import {REFRESHPAGE} from './refreshPageType';

export const getRefreshPageAction  = (data=null)=>{
    return {
        type:REFRESHPAGE,
        payload:data
    }
}