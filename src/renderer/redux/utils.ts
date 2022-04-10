import { Dispatch } from "redux";
import { Take } from "../../common/Project";
import { startLoading, stopLoading } from "./app/actions";
import { RootState } from "./store";

export const withLoader = (
  dispatch: Dispatch,
  loadingMessage: string,
  cb: () => Promise<void>
) => {
  (async () => {
    try {
      dispatch(startLoading(loadingMessage));
      await cb();
    } finally {
      dispatch(stopLoading());
    }
  })();
};

export const withCurrentTake = (state: RootState, cb: (take: Take) => void) => {
  if (state.project.take !== undefined) {
    cb(state.project.take);
  } else {
    throw "No current take found";
  }
};
