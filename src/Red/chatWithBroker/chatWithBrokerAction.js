import {CHATWITHBROKER} from './chatWithBrokerType';

export const getChatWithBrokerAction  = (data=null)=>{
    return {
        type:CHATWITHBROKER,
        payload:data
    }
}