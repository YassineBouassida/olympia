import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_TEAM = "SET_TEAM";

export const fetchTeam = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/team/${id}`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_TEAM, team: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
