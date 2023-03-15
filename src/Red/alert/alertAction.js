import {ALERT} from './alertType';

export const getAlertAction  = (data=null)=>{
    return {
        type:ALERT,
        payload:data
    }
}