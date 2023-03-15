import {ORDERDATA} from './orderDataType';
const initialState = {
  orderData: []
  }
  
  const orderDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDERDATA: return {
        ...state,
        orderData: action.payload
      }
  
      default: return state
    }
  }
  
  export default orderDataReducer