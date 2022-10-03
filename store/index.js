import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
//reducers
import menuReducer from "./reducers/menu";
import homeReducer from "./reducers/home";
import metadataReducer from "./reducers/metadata";

const rootReducers = combineReducers({
  menu: menuReducer,
  home: homeReducer,
  metadata: metadataReducer,
});
export const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
