import { combineReducers, createStore } from "redux";
import userPreferencesReducer from "./bundles/userPreferences";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
});

const store = createStore(rootReducer);

export default store;
