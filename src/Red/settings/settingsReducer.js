import {SETTINGS} from './settingsType';
const initialState = {
  settings: {}
  }
  
  const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SETTINGS: return {
        ...state,
        settings: action.payload
      }
  
      default: return state
    }
  }
  
  export default settingsReducer