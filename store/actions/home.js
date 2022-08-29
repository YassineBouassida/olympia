import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_PLAYERS = "SET_PLAYERS";
export const SET_CLUBS = "SET_CLUBS";
export const SET_MOST_VALUABLE_PLAYER = "SET_MOST_VALUABLE_PLAYER";
export const SET_MOST_VALUABLE_YOUNG_PLAYER = "SET_MOST_VALUABLE_YOUNG_PLAYER";
export const SET_MOST_VALUABLE_GOAL_PLAYER = "SET_MOST_VALUABLE_GOAL_PLAYER";

export const fetchPlayers = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/special_stats_player`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_PLAYERS, players: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
export const fetchClubs = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/tots`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_CLUBS, clubs: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
export const fetchMostValuablePlayer = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/mvp`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_MOST_VALUABLE_PLAYER,
        mostValuablePlayer: response.data,
      });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
export const fetchMostValuableYoungPlayer = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/mvyp`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_MOST_VALUABLE_YOUNG_PLAYER,
        mostValuableYoungKeeper: response.data,
      });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
export const fetchMostValuableGoalPlayer = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/mvgk`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_MOST_VALUABLE_GOAL_PLAYER,
        mostValuableGoalKeeper: response.data,
      });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
