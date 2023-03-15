import {HISTORYSETTINGS} from './historySettingsType';

export const getHistorySettingsAction  = (data=null)=>{
    return {
        type:HISTORYSETTINGS,
        payload:data
    }
}