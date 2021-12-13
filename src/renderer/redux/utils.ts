import { Dispatch } from "redux";
import { startLoading, stopLoading } from "./reducers/app/reducer";

export const withLoader = (
  dispatch: Dispatch,
  loadingMessage: string,
  cb: Promise<void>
) => {
  (async () => {
    dispatch(startLoading(loadingMessage));
    await cb;
    dispatch(stopLoading());
  })();
};
