import {SITETHEME} from './siteThemeType';

export const getsiteThemeAction  = (data=null)=>{
    return {
        type:SITETHEME,
        payload:data
    }
}