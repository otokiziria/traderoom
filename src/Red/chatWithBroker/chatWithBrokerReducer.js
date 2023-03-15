import {CHATWITHBROKER} from './chatWithBrokerType';
const initialState = {
  chatWithBroker: false
  }
  
  const chatWithBrokerReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHATWITHBROKER: return {
        ...state,
        chatWithBroker: action.payload
      }
  
      default: return state
    }
  }
  
  export default chatWithBrokerReducer