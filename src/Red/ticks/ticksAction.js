import {TICKS} from './ticksType';

export const getTicksAction  = (data=null)=>{
    return {
        type:TICKS,
        payload:data
    }
}