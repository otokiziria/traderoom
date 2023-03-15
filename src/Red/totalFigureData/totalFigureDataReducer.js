import {TOTALFIGUREDATA} from './totalFigureDataType';
const initialState = {
  totalFigureData: {
        data: {}
    }
  }
  
  const totalFigureDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOTALFIGUREDATA: return {
        ...state,
        totalFigureData: action.payload
      }
  
      default: return state
    }
  }
  
  export default totalFigureDataReducer