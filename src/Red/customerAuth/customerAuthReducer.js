import {CUSTOMERAUTH} from './customerAuthType';
const initialState = {
  costumerAuth: {
        isAuthenticated: false,
        user: {},
        token: null,
        loaded: false
    }
  }
  
  const customerAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case CUSTOMERAUTH: return {
        ...state,
        customerAuth: action.payload
      }
  
      default: return state
    }
  }
  
  export default customerAuthReducer