import {ORDERTABLEACTIVESYMBOL} from './orderTableActiveSymbolType';
const initialState = {
  orderTableActiveSymbol: {}
  }
  
  const orderTableActiveSymbolReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDERTABLEACTIVESYMBOL: return {
        ...state,
        orderTableActiveSymbol: action.payload
      }
  
      default: return state
    }
  }
  
  export default orderTableActiveSymbolReducer