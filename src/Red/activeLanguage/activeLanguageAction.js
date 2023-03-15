import {ACTIVELANGUAGE} from './activeLanguageType';

export const getActiveLanguageAction  = (data=null)=>{
    return {
        type:ACTIVELANGUAGE,
        payload:data
    }
}