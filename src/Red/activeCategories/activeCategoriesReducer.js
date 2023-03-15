import { ACTIVECATEGORIES } from "./activeCategoriesType";
const initialState = {
  activeCategories: [],
};

const activeCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVECATEGORIES:
      return {
        ...state,
        activeCategories: action.payload,
      };

    default:
      return state;
  }
};

export default activeCategoriesReducer;
