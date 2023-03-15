import {TOTALFIGURESETTINGS} from './totalFigureSettingsType';
const initialState = {
  totalFigureSettings: {
        data: {}
    }
  }
  
  const totalFigureSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOTALFIGURESETTINGS: return {
        ...state,
        totalFigureSettings: action.payload
      }
  
      default: return state
    }
  }
  
  export default totalFigureSettingsReducer