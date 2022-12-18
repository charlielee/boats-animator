import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { projectReducer } from "./slices/projectSlice";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, createCaptureMiddleware))
// );

export const store = configureStore({
  reducer: { app: appReducer, project: projectReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
