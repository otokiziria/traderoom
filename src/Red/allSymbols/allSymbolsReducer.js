import {ALLSYMBOLS} from './allSymbolsType';
const initialState = {
  allSymbols: {
        data: {}
    }
  }
  
  const allSymbolsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALLSYMBOLS: return {
        ...state,
        allSymbols: action.payload
      }
  
      default: return state
    }
  }
  
  export default allSymbolsReducer