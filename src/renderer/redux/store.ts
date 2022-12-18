import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project/reducer";
import { appReducer } from "./slices/appSlice";

// export type RootState = ReturnType<typeof rootReducer>;

// const rootReducer = combineReducers({
//   app: appReducer,
//   project: projectReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, createCaptureMiddleware))
// );

export const store = configureStore({
  reducer: { app: appReducer, project: projectReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
