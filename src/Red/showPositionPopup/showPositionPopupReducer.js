import {SHOWPOSITIONPOPUP} from './showPositionPopupType';
const initialState = {
  showPositionPopup: false
  }
  
  const showPositionPopupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOWPOSITIONPOPUP: return {
        ...state,
        showPositionPopup: action.payload
      }
  
      default: return state
    }
  }
  
  export default showPositionPopupReducer