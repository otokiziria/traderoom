import {SETTINGS} from './settingsType';

export const getSettingsAction  = (data=null)=>{
    return {
        type:SETTINGS,
        payload:data
    }
}