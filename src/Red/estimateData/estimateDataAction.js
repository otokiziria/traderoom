import {ESTIMATEDATA} from './estimateDataType';

export const getEstimateDataAction  = (data=null)=>{
    return {
        type:ESTIMATEDATA,
        payload:data
    }
}