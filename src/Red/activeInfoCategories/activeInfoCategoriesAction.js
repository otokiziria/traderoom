import {ACTIVEINFOCATEGORIES} from './activeInfoCategoriesType';

export const getActiveInfoCategoriesAction  = (data=null)=>{
    return {
        type:ACTIVEINFOCATEGORIES,
        payload:data
    }
}