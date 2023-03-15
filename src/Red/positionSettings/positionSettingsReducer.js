import {POSITIONSETTINGS} from './positionSettingsType';
const initialState = {
  positionSettings: {
        data: {}
    }
  }
  
  const positionSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case POSITIONSETTINGS: return {
        ...state,
        positionSettings: action.payload
      }
  
      default: return state
    }
  }
  
  export default positionSettingsReducer