import { ProjectActions, ProjectActionType } from "./actions";
import { initialProjectState, ProjectState } from "./state";

const projectReducer = (
  state = initialProjectState,
  action: ProjectActions
): ProjectState => {
  if (state.take) {
    switch (action.type) {
      case ProjectActionType.ADD_FRAME_TRACK_ITEM:
        return {
          ...state,
          take: {
            ...state.take,
            frameTrack: {
              ...state.take.frameTrack,
              trackItems: [
                ...state.take.frameTrack.trackItems,
                action.payload.trackItem,
              ],
            },
          },
        };

      case ProjectActionType.INCREMENT_EXPORTED_FRAME_NUMBER:
        return {
          ...state,
          take: {
            ...state.take,
            lastExportedFrameNumber: state.take.lastExportedFrameNumber + 1,
          },
        };
    }
  }

  switch (action.type) {
    case ProjectActionType.ADD_FILE_REF:
      return {
        ...state,
        fileRefs: [...state.fileRefs, action.payload.fileRef],
      };
    case ProjectActionType.ADD_TAKE:
      return {
        ...state,
        take: action.payload.take,
      };

    default:
      return state;
  }
};

export default projectReducer;
