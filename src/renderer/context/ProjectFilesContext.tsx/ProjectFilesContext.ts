import { createContext } from "react";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";

interface ProjectFilesContextProps {
  saveTrackItemToDisk: (take: Take, trackItem: TrackItem, blob: Blob) => Promise<void>;
  deleteTrackItem: (trackItem: TrackItem) => Promise<void>;
  getTrackItemObjectURL: (trackItem: TrackItem) => string;
}

export const ProjectFilesContext = createContext<Partial<ProjectFilesContextProps>>({});
