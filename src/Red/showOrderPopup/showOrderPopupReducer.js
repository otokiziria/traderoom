import {SHOWORDERPOPUP} from './showOrderPopupType';
const initialState = {
  showOrderPopup: false
  }
  
  const showOrderPopupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOWORDERPOPUP: return {
        ...state,
        showOrderPopup: action.payload
      }
  
      default: return state
    }
  }
  
  export default showOrderPopupReducer