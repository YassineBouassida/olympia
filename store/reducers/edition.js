import {
  SET_PLAYERS,
  SET_SUB_MENU,
  SET_STATS,
  SET_TEAMS,
  SET_GAMES,
  SET_GROUP_STAGE,
  SET_STANDINGS,
  SET_KNOCK_OUT_STAGE,
  SET_TEAM_OF_THE_SEASON,
  SET_MOST_VALUABLE_YOUNG_PLAYER,
  SET_MOST_VALUABLE_PLAYER,
  SET_MOST_VALUABLE_GOAL_PLAYER,
  SET_DEFAULT_GROUP_STAGE,
  SET_DEFAULT_STANDINGS,
} from "../actions/edition";

const initialState = {
  submenu: {},
  stats: {},
  teams: [],
  games: {},
  groupstage: {},
  defaultgroupstage: {},
  standings: {},
  defaultstandings: {},
  knockoutstage: {},
  players: [],
  teamOfTheSeason: [],
  mostValuableYoungPlayer: {},
  mostValuablePlayer: {},
  mostValuableGoalKeeper: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUB_MENU:
      return {
        ...state,
        submenu: action.submenu,
      };
    case SET_STATS:
      return {
        ...state,
        stats: action.stats,
      };
    case SET_TEAMS:
      return {
        ...state,
        teams: action.teams,
      };
    case SET_GAMES:
      return {
        ...state,
        games: action.games,
      };
    case SET_GROUP_STAGE:
      return {
        ...state,
        groupstage: action.groupstage,
      };
    case SET_DEFAULT_GROUP_STAGE:
      return {
        ...state,
        groupstage: action.defaultgroupstage,
        defaultgroupstage: action.defaultgroupstage,
      };
    case SET_DEFAULT_STANDINGS:
      return {
        ...state,
        standings: action.defaultstandings,
        defaultstandings: action.defaultstandings,
      };
    case SET_STANDINGS:
      return {
        ...state,
        standings: action.standings,
      };
    case SET_KNOCK_OUT_STAGE:
      return {
        ...state,
        knockoutstage: action.knockoutstage,
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };

    case SET_TEAM_OF_THE_SEASON:
      return {
        ...state,
        teamOfTheSeason: action.teamOfTheSeason,
      };
    case SET_MOST_VALUABLE_YOUNG_PLAYER:
      return {
        ...state,
        mostValuableYoungPlayer: action.mostValuableYoungPlayer,
      };
    case SET_MOST_VALUABLE_PLAYER:
      return {
        ...state,
        mostValuablePlayer: action.mostValuablePlayer,
      };
    case SET_MOST_VALUABLE_GOAL_PLAYER:
      return {
        ...state,
        mostValuableGoalKeeper: action.mostValuableGoalKeeper,
      };

    default:
      return state;
  }
};
