import {SITELOADERCOUNT} from './siteLoaderCountType';

export const getSiteLoaderCountAction  = (data=null)=>{
    return {
        type:SITELOADERCOUNT,
        payload:data
    }
}