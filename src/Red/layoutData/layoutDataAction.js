import {LAYOUTDATA} from './layoutDataType';

export const getLayoutDataAction  = (data=null)=>{
    return {
        type:LAYOUTDATA,
        payload:data
    }
}