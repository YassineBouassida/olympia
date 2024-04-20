import { SET_TEAM } from "../actions/team";

const initialState = {
  team: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM:
      return {
        team: action.team,
      };
    default:
      return state;
  }
};
