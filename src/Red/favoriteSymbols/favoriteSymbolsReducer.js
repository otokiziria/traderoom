import {FAVORITESYMBOLS} from './favoriteSymbolsType';
const initialState = {
  favoriteSymbols: []
  }
  
  const favoriteSymbolsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FAVORITESYMBOLS: return {
        ...state,
        favoriteSymbols: action.payload
      }
  
      default: return state
    }
  }
  
  export default favoriteSymbolsReducer