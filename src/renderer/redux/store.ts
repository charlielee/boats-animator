import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { captureReducer } from "./slices/captureSlice";
import { projectReducer } from "./slices/projectSlice";

const rootReducer = combineReducers({
  app: appReducer,
  capture: captureReducer,
  project: projectReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
