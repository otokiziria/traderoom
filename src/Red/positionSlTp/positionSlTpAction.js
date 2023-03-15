import {POSITIONSLTP} from './positionSlTpType';

export const getPositionSlTpAction  = (data=null)=>{
    return {
        type:POSITIONSLTP,
        payload:data
    }
}