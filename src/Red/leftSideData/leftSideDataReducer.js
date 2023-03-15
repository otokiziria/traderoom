import {LEFTSIDEDATA} from './leftSideDataType';
const initialState = {
  leftSideData: {
        data: {}
    }
  }
  
  const leftSideDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case LEFTSIDEDATA: return {
        ...state,
        leftSideData: action.payload
      }
  
      default: return state
    }
  }
  
  export default leftSideDataReducer