import { Take, TrackItem } from "../../../common/Project";

export enum ProjectActionType {
  ADD_FRAME_TRACK_ITEM = "project/ADD_FRAME_TRACK_ITEM",
  ADD_PROJECT = "project/ADD_PROJECT",
  ADD_TAKE = "project/ADD_TAKE",
}

export type ProjectActions = AddFrameTrackAction | AddTakeAction;

export interface AddFrameTrackAction {
  type: ProjectActionType.ADD_FRAME_TRACK_ITEM;
  payload: {
    trackItem: TrackItem;
  };
}
export interface AddTakeAction {
  type: ProjectActionType.ADD_TAKE;
  payload: {
    take: Take;
  };
}

export const addTake = (take: Take) => ({
  type: ProjectActionType.ADD_TAKE,
  payload: {
    take,
  },
});

export const addFrameTrackItem = (trackItem: TrackItem) => ({
  type: ProjectActionType.ADD_FRAME_TRACK_ITEM,
  payload: {
    trackItem,
  },
});
