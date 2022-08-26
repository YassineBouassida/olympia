import {
  SET_PLAYERS,
  SET_CLUBS,
  SET_MOST_VALUABLE_PLAYER,
  SET_MOST_VALUABLE_GOAL_PLAYER,
} from "../actions/home";

const initialState = {
  players: [],
  clubs: [],
  mostValuablePlayer: {},
  mostValuableGoalKeeper: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
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
