import { SET_LANG } from "../actions/menu";

const initialState = {
  lang: { name: "English", key: "en" ,type:'latin'},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        lang: action.lang,
      };
    default:
      return state;
  }
};
