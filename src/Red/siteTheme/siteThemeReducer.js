import {SITETHEME} from './siteThemeType';
const initialState = {
  siteTheme: "Dark"
  }
  
  const siteThemeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SITETHEME: return {
        ...state,
        siteTheme: action.payload
      }
  
      default: return state
    }
  }
  
  export default siteThemeReducer