import {LEFTSIDEDATA} from './leftSideDataType';

export const getLeftSideDataAction  = (data=null)=>{
    return {
        type:LEFTSIDEDATA,
        payload:data
    }
}