import { Take, TrackType } from "../../../common/Project";

export enum ProjectActionType {
  ADD_TAKE = "project/ADD_TAKE",
  ADD_TRACK = "project/ADD_TRACK"
}

export type ProjectAction = ProjectAction.AddTake;

export namespace ProjectAction {
  export interface AddTake {
    type: ProjectActionType.ADD_TAKE;
    payload: {
      take: Take;
    };
  }

  export namespace Add
}

export const addTake = (
  shotNumber: number,
  takeNumber: number,
  frameRate: number
): ProjectAction.AddTake => ({
  type: ProjectActionType.ADD_TAKE,
  payload: {
    take: {
      id: "1",
      shotNumber,
      takeNumber,
      frameRate,
      directoryPath: "",
      captureFramesHold: 1,
      frameTrack: {
        id: "1",
        trackType: TrackType.FRAME,
        trackItems: [],
      },
    },
  },
});
