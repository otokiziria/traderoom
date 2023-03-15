import { GET_SIMPLETRADEPERCENT } from './simpleTradePercentType'

export const getSimpleTradePercent = (data = null) => {
  return {
    type: GET_SIMPLETRADEPERCENT,
    payload: data
  }
}
