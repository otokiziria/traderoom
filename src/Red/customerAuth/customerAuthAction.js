import {CUSTOMERAUTH} from './customerAuthType';

export const getCustomerAuthAction  = (data=null)=>{
    return {
        type:CUSTOMERAUTH,
        payload:data
    }
}