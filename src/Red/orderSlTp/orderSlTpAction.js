import {ORDERSLTP} from './orderSlTpType';

export const getOrderSlTpAction  = (data=null)=>{
    return {
        type:ORDERSLTP,
        payload:data
    }
}