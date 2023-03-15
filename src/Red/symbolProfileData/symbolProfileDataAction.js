import {SYMBOLPROFILEDATA} from './symbolProfileDataType';

export const getSymbolProfileDataAction  = (data=null)=>{
    return {
        type:SYMBOLPROFILEDATA,
        payload:data
    }
}