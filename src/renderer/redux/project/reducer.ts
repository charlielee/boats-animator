import { ProjectAction, ProjectActionType } from "./actions";
import { initialProjectState, ProjectState } from "./state";

const projectReducer = (
  state = initialProjectState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
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
