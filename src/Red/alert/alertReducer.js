import {ALERT} from './alertType';
const initialState = {
    alert: {
        msg: null,
        status: 0
    }
  }
  
  const alertReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALERT: return {
        ...state,
        alert: action.payload
      }
  
      default: return state
    }
  }
  
  export default alertReducer