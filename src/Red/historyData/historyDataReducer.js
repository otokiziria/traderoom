import {HISTORYDATA} from './historyDataType';
const initialState = {
  historyData: []
  }
  
  const historyDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case HISTORYDATA: return {
        ...state,
        historyData: action.payload
      }
  
      default: return state
    }
  }
  
  export default historyDataReducer