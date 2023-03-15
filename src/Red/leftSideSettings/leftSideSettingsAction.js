import {LEFTSIDESETTINGS} from './leftSideSettingsType';

export const getLeftSideSettingsAction  = (data=null)=>{
    return {
        type:LEFTSIDESETTINGS,
        payload:data
    }
}