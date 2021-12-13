import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import appReducer from "./app/reducer";
import { createCaptureMiddleware } from "./middleware/imagingDeviceMiddleware";
import userPreferencesReducer from "./userPreferences/reducer";
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
