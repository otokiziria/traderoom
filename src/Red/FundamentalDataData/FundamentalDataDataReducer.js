import {FUNDAMENTALDATADATA} from './fundamentalDataDataType';
const initialState = {
  fundamentalDataData: {
        data: {}
    }
  }
  
  const fundamentalDataDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FUNDAMENTALDATADATA: return {
        ...state,
        fundamentalDataData: action.payload
      }
  
      default: return state
    }
  }
  
  export default fundamentalDataDataReducer