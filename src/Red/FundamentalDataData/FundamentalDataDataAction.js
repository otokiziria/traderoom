import {FUNDAMENTALDATADATA} from './fundamentalDataDataType';

export const getFundamentalDataDataAction  = (data=null)=>{
    return {
        type:FUNDAMENTALDATADATA,
        payload:data
    }
}