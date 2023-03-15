import {POSITIONSETTINGS} from './positionSettingsType';

export const getPositionSettingsAction  = (data=null)=>{
    return {
        type:POSITIONSETTINGS,
        payload:data
    }
}