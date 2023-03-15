import {TICKS} from './ticksType';
const initialState = {
  ticks: {}
  }
  
  const ticksReducer = (state = initialState, action) => {
    switch (action.type) {
      case TICKS: return {
        ...state,
        ticks: action.payload
      }
  
      default: return state
    }
  }
  
  export default ticksReducer