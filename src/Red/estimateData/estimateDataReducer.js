import {ESTIMATEDATA} from './estimateDataType';
const initialState = {
  estimateData: []
  }
  
  const estimateDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case ESTIMATEDATA: return {
        ...state,
        estimateData: action.payload
      }
  
      default: return state
    }
  }
  
  export default estimateDataReducer