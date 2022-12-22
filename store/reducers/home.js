import {
  SET_PLAYERS,
  SET_CLUBS,
  SET_TEAM_OF_THE_SEASON,
  SET_MOST_VALUABLE_YOUNG_PLAYER,
  SET_MOST_VALUABLE_PLAYER,
  SET_MOST_VALUABLE_GOAL_PLAYER,
  SET_GAME_BAR,
} from "../actions/home";

const initialState = {
  players: [],
  clubs: [],
  gamebar: [],
  teamOfTheSeason: [],
  mostValuableYoungPlayer: {},
  mostValuablePlayer: {},
  mostValuableGoalKeeper: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_BAR:
      return {
        ...state,
        gamebar: action.gamebar,
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    case SET_CLUBS:
      return {
        ...state,
        clubs: action.clubs,
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
