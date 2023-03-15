import {ONECLICKTRADING} from './oneClickTradingType';
const initialState = {
  oneClickTrading: {
        data: {}
    }
  }
  
  const oneClickTradingReducer = (state = initialState, action) => {
    switch (action.type) {
      case ONECLICKTRADING: return {
        ...state,
        oneClickTrading: action.payload
      }
  
      default: return state
    }
  }
  
  export default oneClickTradingReducer