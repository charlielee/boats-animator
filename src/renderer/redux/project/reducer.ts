import { ProjectActions, ProjectActionType } from "./actions";
import { initialProjectState, ProjectState } from "./state";

const projectReducer = (
  state = initialProjectState,
  action: ProjectActions
): ProjectState => {
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
    case ProjectActionType.ADD_FRAME_TRACK_ITEM:
      return state.take
        ? {
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
          }
        : {
            ...state,
          };
    default:
      return state;
  }
};

export default projectReducer;
