import {CHARTHISTORYDATA} from './chartHistoryDataType';
const initialState = {
  chartHistoryData: []
  }
  
  const chartHistoryDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHARTHISTORYDATA: return {
        ...state,
        chartHistoryData: action.payload
      }
  
      default: return state
    }
  }
  
  export default chartHistoryDataReducer