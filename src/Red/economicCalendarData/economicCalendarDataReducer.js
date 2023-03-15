import {ECONOMICCALENDARDATA} from './economicCalendarDataType';
const initialState = {
  economicCalendarData: {
        data: {}
    }
  }
  
  const economicCalendarDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case ECONOMICCALENDARDATA: return {
        ...state,
        economicCalendarData: action.payload
      }
  
      default: return state
    }
  }
  
  export default economicCalendarDataReducer