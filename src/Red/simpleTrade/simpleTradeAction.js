import { GET_SIMPLETRADE } from './simpleTradeType'

export const getSimpleTrade = (data = null) => {
  return {
    type: GET_SIMPLETRADE,
    payload: data
  }
}
