import { SET_MENU } from "../actions/menu";

const initialState = {
  menu: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU:
      return {
        menu: action.menu,
      };
    default:
      return state;
  }
};
