import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/project/Take";

export interface ProjectState {
  fileRefs: FileRef[];
  take?: Take;
  playbackSpeed: number;
}

export const initialProjectState: ProjectState = {
  fileRefs: [],
  take: undefined,
  playbackSpeed: 1,
};
