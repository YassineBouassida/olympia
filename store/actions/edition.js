import axios from "axios";
const baseUrl = "https://olympia-api.phoinix.ai";

export const SET_SUB_MENU = "SET_SUB_MENU";
export const SET_STATS = "SET_STATS";
export const SET_GAMES = "SET_GAMES";
export const SET_TEAMS = "SET_TEAMS";
export const SET_PLAYERS = "SET_PLAYERS";
export const SET_GROUP_STAGE = "SET_GROUP_STAGE";
export const SET_DEFAULT_GROUP_STAGE = "SET_DEFAULT_GROUP_STAGE";
export const SET_DEFAULT_STANDINGS = "SET_DEFAULT_STANDINGS";
export const SET_STANDINGS = "SET_STANDINGS";
export const SET_KNOCK_OUT_STAGE = "SET_KNOCK_OUT_STAGE";
export const SET_TEAM_OF_THE_SEASON = "SET_TEAM_OF_THE_SEASON";
export const SET_MOST_VALUABLE_PLAYER = "SET_MOST_VALUABLE_PLAYER";
export const SET_MOST_VALUABLE_YOUNG_PLAYER = "SET_MOST_VALUABLE_YOUNG_PLAYER";
export const SET_MOST_VALUABLE_GOAL_PLAYER = "SET_MOST_VALUABLE_GOAL_PLAYER";

export const fetchKnockOutStage = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/knockoutstage`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_KNOCK_OUT_STAGE, knockoutstage: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchDefaultGroupStage = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/groupstage`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_DEFAULT_GROUP_STAGE,
        defaultgroupstage: response.data,
      });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchDefaultStandings = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/standings`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: SET_DEFAULT_STANDINGS,
        defaultstandings: response.data,
      });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchGroupStage = (
  editionId,
  {
    venue = "N",
    fromDate = "2021-06-11",
    toDate = "2022-06-11",
    fromMatchDay = 1,
    toMatchDay = 3,
    live = 0,
  }
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/groupstage/${venue}/${fromDate}/${toDate}/${fromMatchDay}/${toMatchDay}/live=${live}`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_GROUP_STAGE, groupstage: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchStats = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/stats`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_STATS, stats: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchGames = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/games`;
    console.log("editio id ", editionId, url);

    try {
      const response = await axios.get(url);
      dispatch({ type: SET_GAMES, games: response.data });
    } catch (err) {
      console.log("error from games ", err.message);

      throw err;
    }
  };
};
export const fetchSubMenu = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/submenu`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_SUB_MENU, submenu: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchStandings = (
  editionId,
  {
    venue = "N",
    fromDate = "2021-06-11",
    toDate = "2022-06-11",
    fromMatchDay = 1,
    toMatchDay = 3,
    live = 0,
  }
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/standings/${venue}/${fromDate}/${toDate}/${fromMatchDay}/${toMatchDay}/live=${live}`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_STANDINGS, standings: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchTeams = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/teams`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_TEAMS, teams: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};
export const fetchPlayers = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/players`;
    try {
      const response = await axios.get(url);
      dispatch({ type: SET_PLAYERS, players: response.data });
    } catch (err) {
      console.log("error ", err.message);

      throw err;
    }
  };
};

export const fetchTeamOfTheSeason = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/tots`;
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
export const fetchMostValuablePlayer = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/mvp`;
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
export const fetchMostValuableYoungPlayer = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/mvyp`;
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
export const fetchMostValuableGoalPlayer = (editionId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/edition/${editionId}/mvgk`;
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
