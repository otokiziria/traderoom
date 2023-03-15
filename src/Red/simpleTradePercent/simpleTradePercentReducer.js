import { GET_SIMPLETRADEPERCENT } from './simpleTradePercentType'

const initialState = {
  simpleTradePercent: 10
}

const simpleTradePercentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIMPLETRADEPERCENT: return {
      ...state,
      simpleTradePercent: action.payload
    }

    default: return state
  }
}

export default simpleTradePercentReducer
