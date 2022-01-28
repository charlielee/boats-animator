import { Take } from "../../../common/Project";

export interface ProjectState {
  take?: Take;
}

export const initialProjectState: ProjectState = {
  take: undefined,
};
