import {ORDERSLTP} from './orderSlTpType';
const initialState = {
  orderSlTp: {
    sl:0,
    tp:0
  }
  }
  
  const orderSlTpReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDERSLTP: return {
        ...state,
        orderSlTp: action.payload
      }
  
      default: return state
    }
  }
  
  export default orderSlTpReducer