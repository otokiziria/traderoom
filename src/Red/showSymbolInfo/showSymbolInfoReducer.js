import {SHOWSYMBOLINFO} from './showSymbolInfoType';
const initialState = {
  showSymbolInfo: false
  }
  
  const showSymbolInfoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOWSYMBOLINFO: return {
        ...state,
        showSymbolInfo: action.payload
      }
  
      default: return state
    }
  }
  
  export default showSymbolInfoReducer