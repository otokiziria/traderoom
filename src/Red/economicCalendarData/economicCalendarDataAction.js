import {ECONOMICCALENDARDATA} from './economicCalendarDataType';

export const getEconomicCalendarDataAction  = (data=null)=>{
    return {
        type:ECONOMICCALENDARDATA,
        payload:data
    }
}