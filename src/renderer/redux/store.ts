import { combineReducers, createStore } from "redux";
import settingsReducer from "./bundles/settings";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
