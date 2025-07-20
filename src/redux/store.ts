import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { projectReducer } from "./slices/projectSlice";

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
