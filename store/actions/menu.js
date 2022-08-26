import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_MENU = "SET_MENU";

export const fetchMenu = () => {
  console.log("fetchMenu lanched  ", process.env.BASE_URL);

  return async (dispatch) => {
    const url = `${baseUrl}/menu`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_MENU, menu: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
