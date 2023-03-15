import { GET_SIMPLETRADE } from './simpleTradeType'

const initialState = {
  simpleTrade: 1
}

const simpleTradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIMPLETRADE: return {
      ...state,
      simpleTrade: action.payload
    }

    default: return state
  }
}

export default simpleTradeReducer
