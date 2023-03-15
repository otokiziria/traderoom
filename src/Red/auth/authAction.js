import {AUTH} from './authType';

export const getAuthAction  = (data=null)=>{
    return {
        type:AUTH,
        payload:data
    }
}