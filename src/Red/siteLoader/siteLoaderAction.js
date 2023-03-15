import {SITELOADER} from './siteLoaderType';

export const getSiteLoaderAction  = (data=null)=>{
    return {
        type:SITELOADER,
        payload:data
    }
}