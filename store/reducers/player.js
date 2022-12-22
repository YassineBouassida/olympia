import { SET_PLAYER } from "../actions/player";

const initialState = {
  player: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        player: action.player,
      };
    default:
      return state;
  }
};
