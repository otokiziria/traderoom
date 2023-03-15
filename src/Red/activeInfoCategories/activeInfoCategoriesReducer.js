import { ACTIVEINFOCATEGORIES } from "./activeInfoCategoriesType";
const initialState = {
  activeInfoCategories: [],
};

const activeInfoCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVEINFOCATEGORIES:
      return {
        ...state,
        activeInfoCategories: action.payload,
      };

    default:
      return state;
  }
};

export default activeInfoCategoriesReducer;
