import {INFOSYMBOL} from './infoSymbolType';
const initialState = {
  infoSymbol: {}
  }
  
  const infoSymbolReducer = (state = initialState, action) => {
    switch (action.type) {
      case INFOSYMBOL: return {
        ...state,
        infoSymbol: action.payload
      }
  
      default: return state
    }
  }
  
  export default infoSymbolReducer