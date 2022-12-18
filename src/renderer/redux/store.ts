import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createCaptureMiddleware } from "./capture/middleware";
import { appReducer } from "./slices/appSlice";
import { projectReducer } from "./slices/projectSlice";

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["imagingDevice/ATTACH_STREAM_TO_VIDEO"],
      },
    }).concat(createCaptureMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
