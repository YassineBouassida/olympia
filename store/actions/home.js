import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_PLAYERS = "SET_PLAYERS";
export const SET_CLUBS = "SET_CLUBS";
export const SET_GAME_BAR = "SET_GAME_BAR";

export const SET_TEAM_OF_THE_SEASON = "SET_TEAM_OF_THE_SEASON";
export const SET_MOST_VALUABLE_PLAYER = "SET_MOST_VALUABLE_PLAYER";
export const SET_MOST_VALUABLE_YOUNG_PLAYER = "SET_MOST_VALUABLE_YOUNG_PLAYER";
export const SET_MOST_VALUABLE_GOAL_PLAYER = "SET_MOST_VALUABLE_GOAL_PLAYER";

export const fetchGameBar = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/games_bar`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_GAME_BAR, gamebar: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchPlayers = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/special_stats_players`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_PLAYERS, players: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchClubs = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/special_stats_teams`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_CLUBS, clubs: response.data });
    } catch (err) {
      console.log("error ", err);

      throw err;
    }
  };
};
export const fetchTeamOfTheSeason = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/tots`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_TEAM_OF_THE_SEASON,
        teamOfTheSeason: response.data,
      });
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
        mostValuableYoungPlayer: response.data,
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
