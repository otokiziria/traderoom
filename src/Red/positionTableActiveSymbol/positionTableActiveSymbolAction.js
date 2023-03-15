import {POSITIONTABLEACTIVESYMBOL} from './positionTableActiveSymbolType';

export const getPositionTableActiveSymbolAction  = (data=null)=>{
    return {
        type:POSITIONTABLEACTIVESYMBOL,
        payload:data
    }
}