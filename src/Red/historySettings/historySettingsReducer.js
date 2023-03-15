import {HISTORYSETTINGS} from './historySettingsType';
const initialState = {
  historySettings: {
        data: {}
    }
  }
  
  const historySettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case HISTORYSETTINGS: return {
        ...state,
        historySettings: action.payload
      }
  
      default: return state
    }
  }
  
  export default historySettingsReducer