import {CURRENCY} from './currencyType';
const initialState = {
  currency: {USD: 1, EUR: 1, GBP: 1}
  }
  
  const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case CURRENCY: return {
        ...state,
        currency: action.payload
      }
  
      default: return state
    }
  }
  
  export default currencyReducer