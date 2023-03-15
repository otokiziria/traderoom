import {MARKETOVERVIEWDATA} from './marketOverviewDataType';

export const getMarketOverviewDataAction  = (data=null)=>{
    return {
        type:MARKETOVERVIEWDATA,
        payload:data
    }
}