import {ACTIVELANGUAGE} from './activeLanguageType';
const initialState = {
    data: null
  }
  
  const activeLanguageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTIVELANGUAGE: return {
        ...state,
        activeLanguage: action.payload
      }
  
      default: return state
    }
  }
  
  export default activeLanguageReducer