import {ACTIVECATEGORIES} from './activeCategoriesType';

export const getActiveCategoriesAction  = (data=null)=>{
    return {
        type:ACTIVECATEGORIES,
        payload:data
    }
}