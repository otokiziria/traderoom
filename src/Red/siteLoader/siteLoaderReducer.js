import {SITELOADER} from './siteLoaderType';
const initialState = {
    siteLoader: 0
  }
  
  const siteLoaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SITELOADER: return {
        ...state,
        siteLoader: action.payload
      }
  
      default: return state
    }
  }
  
  export default siteLoaderReducer