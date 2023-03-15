import {LEFTSIDESETTINGS} from './leftSideSettingsType';
const initialState = {
  leftSideSettings: {
        data: {}
    }
  }
  
  const leftSideSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LEFTSIDESETTINGS: return {
        ...state,
        leftSideSettings: action.payload
      }
  
      default: return state
    }
  }
  
  export default leftSideSettingsReducer