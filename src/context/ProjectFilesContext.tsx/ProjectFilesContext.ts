import { createContext, useContext } from "react";
import { ProjectInfoFileV1, Take } from "../../services/project/types";
import { TrackItem } from "../../services/project/types";

interface ProjectFilesContextProps {
  saveTrackItemToDisk: (take: Take, trackItem: TrackItem, blob: Blob) => Promise<void>;
  deleteTrackItem: (trackItem: TrackItem) => Promise<void>;
  getTrackItemObjectURL: (trackItem: TrackItem) => string;
  unpackProjectInfoFileJSON: (dirHandler :FileSystemDirectoryHandle) => Promise<ProjectInfoFileV1>
  dispatchLoadedProjectInfo:  (projectDirectory: FileSystemDirectoryHandle, projectInfo: ProjectInfoFileV1, take: Take) => Promise<void>;
}

export const ProjectFilesContext = createContext<ProjectFilesContextProps | undefined>(undefined);

export const useProjectFilesContext = () => {
  const context = useContext(ProjectFilesContext);

  if (context === undefined) {
    throw new Error("Must be called within ProjectFilesContextProvider");
  }

  return context;
};
