import {REFRESHPAGE} from './refreshPageType';
const initialState = {
    refreshPage: false
  }
  
  const refreshPageReducer = (state = initialState, action) => {
    switch (action.type) {
      case REFRESHPAGE: return {
        ...state,
        refreshPage: action.payload
      }
  
      default: return state
    }
  }
  
  export default refreshPageReducer