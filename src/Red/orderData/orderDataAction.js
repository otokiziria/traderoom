import {ORDERDATA} from './orderDataType';

export const getOrderDataAction  = (data=null)=>{
    return {
        type:ORDERDATA,
        payload:data
    }
}