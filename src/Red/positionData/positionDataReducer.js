import {POSITIONDATA} from './positionDataType';
const initialState = {
  positionData: []
  }
  
  const positionDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case POSITIONDATA: return {
        ...state,
        positionData: action.payload
      }
  
      default: return state
    }
  }
  
  export default positionDataReducer