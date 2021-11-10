import { combineReducers, createStore } from "redux";
import appReducer from "./app/reducer";
import userPreferencesReducer from "./userPreferences/reducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app: appReducer,
  userPreferences: userPreferencesReducer,
});

const store = createStore(rootReducer);

export default store;
