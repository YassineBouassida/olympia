export const SET_LANG = "SET_LANG";

export const changeLang = (lang) => {
  return (dispatch) => {
    dispatch({ type: SET_LANG, lang: lang });
  };
};
