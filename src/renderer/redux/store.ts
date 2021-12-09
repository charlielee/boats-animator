import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createCaptureMiddleware } from "./middleware/imagingDeviceMiddleware";
import appReducer from "./reducers/app/reducer";
import userPreferencesReducer from "./reducers/userPreferences/reducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app: appReducer,
  userPreferences: userPreferencesReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createCaptureMiddleware)
);

export default store;
