import {MARKETOVERVIEWDATA} from './marketOverviewDataType';
const initialState = {
  marketOverviewData: {
        data: {}
    }
  }
  
  const marketOverviewDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case MARKETOVERVIEWDATA: return {
        ...state,
        marketOverviewData: action.payload
      }
  
      default: return state
    }
  }
  
  export default marketOverviewDataReducer