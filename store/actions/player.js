import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_PLAYER = "SET_PLAYER";

export const fetchPlayer = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/player/${id}`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_PLAYER, player: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
