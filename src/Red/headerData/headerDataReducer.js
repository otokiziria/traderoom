import {HEADERDATA} from './headerDataType';
const initialState = {
    headerData: {}
  }
  
  const headerDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case HEADERDATA: return {
        ...state,
        headerData: action.payload
      }
  
      default: return state
    }
  }
  
  export default headerDataReducer