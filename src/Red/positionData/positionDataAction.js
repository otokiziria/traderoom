import {POSITIONDATA} from './positionDataType';

export const getPositionDataAction  = (data=null)=>{
    return {
        type:POSITIONDATA,
        payload:data
    }
}