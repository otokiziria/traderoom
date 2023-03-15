import {ACTIVESYMBOL} from './activeSymbolType';
const initialState = {
  activeSymbol: {}
  }
  
  const activeSymbolReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTIVESYMBOL: return {
        ...state,
        activeSymbol: action.payload
      }
  
      default: return state
    }
  }
  
  export default activeSymbolReducer