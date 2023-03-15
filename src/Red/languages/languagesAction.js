import {LANGUAGES} from './languagesType';

export const getLanguagesAction  = (data=null)=>{
    return {
        type:LANGUAGES,
        payload:data
    }
}