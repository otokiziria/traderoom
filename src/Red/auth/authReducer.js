import {AUTH} from './authType';
const initialState = {
    auth: {
        isAuthenticated: false,
        user: {},
        token: null,
        loaded: false
    }
  }
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH: return {
        ...state,
        auth: action.payload
      }
  
      default: return state
    }
  }
  
  export default authReducer