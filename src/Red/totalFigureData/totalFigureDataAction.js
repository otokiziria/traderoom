import {TOTALFIGUREDATA} from './totalFigureDataType';

export const getTotalFigureDataAction  = (data=null)=>{
    return {
        type:TOTALFIGUREDATA,
        payload:data
    }
}