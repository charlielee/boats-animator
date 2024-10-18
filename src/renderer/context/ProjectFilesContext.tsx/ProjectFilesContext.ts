import { createContext } from "react";
import { TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { FileInfo } from "../../services/fileManager/FileInfo";
import { Project } from "../../../common/project/Project";

interface ProjectFilesContextProps {
  saveTrackItemToDisk: (take: Take, trackItem: TrackItem, blob: Blob) => Promise<void>;
  getTrackItemFileInfo: (trackItemId: TrackItemId) => FileInfo | undefined;
  saveProjectJsonToDisk: (project: Project, takes: Take[]) => Promise<void>;
}

export const ProjectFilesContext = createContext<ProjectFilesContextProps | undefined>(undefined);
