import {FAVORITESYMBOLS} from './favoriteSymbolsType';

export const getFavoriteSymbolsAction  = (data=null)=>{
    return {
        type:FAVORITESYMBOLS,
        payload:data
    }
}