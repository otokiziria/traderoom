import {LAYOUTDATA} from './layoutDataType';
const initialState = {
    layoutData: {
        data: {}
    }
  }
  
  const layoutDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case LAYOUTDATA: return {
        ...state,
        layoutData: action.payload
      }
  
      default: return state
    }
  }
  
  export default layoutDataReducer