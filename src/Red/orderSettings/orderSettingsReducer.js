import {ORDERSETTINGS} from './orderSettingsType';
const initialState = {
  orderSettings: {
        data: {}
    }
  }
  
  const orderSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDERSETTINGS: return {
        ...state,
        orderSettings: action.payload
      }
  
      default: return state
    }
  }
  
  export default orderSettingsReducer