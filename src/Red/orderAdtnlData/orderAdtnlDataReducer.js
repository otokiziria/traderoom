import {ORDERADTNLDATA} from './orderAdtnlDataType';
const initialState = {
  orderAdtnlData: []
  }
  
  const orderAdtnlDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDERADTNLDATA: return {
        ...state,
        orderAdtnlData: action.payload
      }
  
      default: return state
    }
  }
  
  export default orderAdtnlDataReducer