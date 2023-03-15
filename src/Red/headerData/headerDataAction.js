import {HEADERDATA} from './headerDataType';

export const getHeaderDataAction  = (data=null)=>{
    return {
        type:HEADERDATA,
        payload:data
    }
}