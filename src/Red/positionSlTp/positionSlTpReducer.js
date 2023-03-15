import {POSITIONSLTP} from './positionSlTpType';
const initialState = {
    positionSlTp: {
      sl:0,
      tp:0
    }
  }
  
  const positionSlTpReducer = (state = initialState, action) => {
    switch (action.type) {
      case POSITIONSLTP: return {
        ...state,
        positionSlTp: action.payload
      }
  
      default: return state
    }
  }
  
  export default positionSlTpReducer