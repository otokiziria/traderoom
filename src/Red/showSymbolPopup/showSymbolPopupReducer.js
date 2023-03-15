import {SHOWSYMBOLPOPUP} from './showSymbolPopupType';
const initialState = {
  showSymbolPopup: false
  }
  
  const showSymbolPopupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOWSYMBOLPOPUP: return {
        ...state,
        showSymbolPopup: action.payload
      }
  
      default: return state
    }
  }
  
  export default showSymbolPopupReducer