import {POSITIONTABLEACTIVESYMBOL} from './positionTableActiveSymbolType';
const initialState = {
  positionTableActiveSymbol: {}
  }
  
  const positionTableActiveSymbolReducer = (state = initialState, action) => {
    switch (action.type) {
      case POSITIONTABLEACTIVESYMBOL: return {
        ...state,
        positionTableActiveSymbol: action.payload
      }
  
      default: return state
    }
  }
  
  export default positionTableActiveSymbolReducer