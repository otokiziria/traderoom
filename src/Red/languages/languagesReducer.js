import {LANGUAGES} from './languagesType';
const initialState = {
    data: []
  }
  
  const languagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LANGUAGES: return {
        ...state,
        languages: action.payload
      }
  
      default: return state
    }
  }
  
  export default languagesReducer