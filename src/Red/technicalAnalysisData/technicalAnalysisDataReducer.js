import {TECHNICALANALYSISDATA} from './technicalAnalysisDataType';
const initialState = {
  technicalAnalysisData: {
        data: {}
    }
  }
  
  const technicalAnalysisDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case TECHNICALANALYSISDATA: return {
        ...state,
        technicalAnalysisData: action.payload
      }
  
      default: return state
    }
  }
  
  export default technicalAnalysisDataReducer