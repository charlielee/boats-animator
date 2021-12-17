import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import appReducer from "./app/reducer";
import { createCaptureMiddleware } from "./capture/middleware";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app: appReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createCaptureMiddleware)
);

export default store;
