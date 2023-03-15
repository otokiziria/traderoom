import {SITELOADERCOUNT} from './siteLoaderCountType';
const initialState = {
    siteLoaderCount: 0
  }
  
  const siteLoaderCountReducer = (state = initialState, action) => {
    switch (action.type) {
      case SITELOADERCOUNT: return {
        ...state,
        siteLoaderCount: action.payload
      }
  
      default: return state
    }
  }
  
  export default siteLoaderCountReducer