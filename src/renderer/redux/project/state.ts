import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/Project";

export interface ProjectState {
  fileRefs: FileRef[];
  take?: Take;
}

export const initialProjectState: ProjectState = {
  fileRefs: [],
  take: undefined,
};
