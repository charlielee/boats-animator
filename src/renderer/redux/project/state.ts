import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/project/Take";

export interface ProjectState {
  fileRefs: FileRef[];
  take?: Take;
}

export const initialProjectState: ProjectState = {
  fileRefs: [],
  take: undefined,
};
