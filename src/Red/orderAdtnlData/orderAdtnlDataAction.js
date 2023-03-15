import {ORDERADTNLDATA} from './orderAdtnlDataType';

export const getOrderAdtnlDataAction  = (data=null)=>{
    return {
        type:ORDERADTNLDATA,
        payload:data
    }
}