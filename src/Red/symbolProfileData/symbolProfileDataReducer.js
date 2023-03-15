import {SYMBOLPROFILEDATA} from './symbolProfileDataType';
const initialState = {
  symbolProfileData: {
        data: {}
    }
  }
  
  const symbolProfileDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case SYMBOLPROFILEDATA: return {
        ...state,
        symbolProfileData: action.payload
      }
  
      default: return state
    }
  }
  
  export default symbolProfileDataReducer