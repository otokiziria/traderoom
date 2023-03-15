import {ORDERSETTINGS} from './orderSettingsType';

export const getOrderSettingsAction  = (data=null)=>{
    return {
        type:ORDERSETTINGS,
        payload:data
    }
}