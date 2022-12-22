import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
//reducers
import menuReducer from "./reducers/menu";
import homeReducer from "./reducers/home";
import metadataReducer from "./reducers/metadata";
import editionReducer from "./reducers/edition";
import playerReducer from "./reducers/player";
import teamReducer from "./reducers/team";

const rootReducers = combineReducers({
  menu: menuReducer,
  home: homeReducer,
  metadata: metadataReducer,
  edition: editionReducer,
  player: playerReducer,
  team: teamReducer,
});
export const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
