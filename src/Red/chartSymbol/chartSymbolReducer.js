import {CHARTSYMBOL} from './chartSymbolType';
const initialState = {
  chartSymbol: {}
  }
  
  const chartSymbolReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHARTSYMBOL: return {
        ...state,
        chartSymbol: action.payload
      }
  
      default: return state
    }
  }
  
  export default chartSymbolReducer