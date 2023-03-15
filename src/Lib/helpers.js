import { getAlertAction } from '../Red';
import store from '../Red/store' ;

export function showErrors(err){
    console.log(err);
    if(err.response !== undefined){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => store.dispatch(getAlertAction({msg: error.msg, status: 3})))
        }
    }
    
}

export function showAlertMSG(msg, status){
    store.dispatch(getAlertAction({msg: msg, status: status}))
}
