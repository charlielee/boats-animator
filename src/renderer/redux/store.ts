import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import appReducer from "./app/reducer";
import { createCaptureMiddleware } from "./capture/middleware";
import playbackReducer from "./playback/reducer";
import projectReducer from "./project/reducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app: appReducer,
  playback: playbackReducer,
  project: projectReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, createCaptureMiddleware))
);

export default store;
