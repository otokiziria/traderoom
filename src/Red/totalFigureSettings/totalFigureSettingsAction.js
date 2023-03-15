import {TOTALFIGURESETTINGS} from './totalFigureSettingsType';

export const getTotalFigureSettingsAction  = (data=null)=>{
    return {
        type:TOTALFIGURESETTINGS,
        payload:data
    }
}