import {TECHNICALANALYSISDATA} from './technicalAnalysisDataType';

export const getTechnicalAnalysisDataAction  = (data=null)=>{
    return {
        type:TECHNICALANALYSISDATA,
        payload:data
    }
}