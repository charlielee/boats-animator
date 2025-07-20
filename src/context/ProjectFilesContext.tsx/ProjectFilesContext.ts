import { createContext, useContext } from "react";
import { Take } from "../../services/project/types";
import { TrackItem } from "../../services/project/types";

interface ProjectFilesContextProps {
  saveTrackItemToDisk: (take: Take, trackItem: TrackItem, blob: Blob) => Promise<void>;
  deleteTrackItem: (trackItem: TrackItem) => Promise<void>;
  getTrackItemObjectURL: (trackItem: TrackItem) => string;
}

export const ProjectFilesContext = createContext<ProjectFilesContextProps | undefined>(undefined);

export const useProjectFilesContext = () => {
  const context = useContext(ProjectFilesContext);

  if (context === undefined) {
    throw new Error("Must be called within ProjectFilesContextProvider");
  }

  return context;
};
