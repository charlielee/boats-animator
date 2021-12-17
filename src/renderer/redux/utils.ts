import { Dispatch } from "redux";
import { startLoading, stopLoading } from "./app/actions";

export const withLoader = (
  dispatch: Dispatch,
  loadingMessage: string,
  cb: Promise<void>
) => {
  (async () => {
    try {
      dispatch(startLoading(loadingMessage));
      await cb;
    } finally {
      dispatch(stopLoading());
    }
  })();
};
