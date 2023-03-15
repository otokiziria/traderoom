import {SYMBOLFILTER} from './symbolFilterType';
const initialState = {
    symbolFilter: {
        type: 0,
        id: 0
    }
  }
  
  const symbolFilterReducer = (state = initialState, action) => {
    switch (action.type) {
      case SYMBOLFILTER: return {
        ...state,
        symbolFilter: action.payload
      }
  
      default: return state
    }
  }
  
  export default symbolFilterReducer