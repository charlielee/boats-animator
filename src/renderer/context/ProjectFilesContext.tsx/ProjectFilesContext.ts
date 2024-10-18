import { createContext } from "react";
import { TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { FileInfo } from "../../services/fileManager/FileInfo";

interface ProjectFilesContextProps {
  saveTrackItemToDisk: (take: Take, trackItem: TrackItem, blob: Blob) => Promise<void>;
  getTrackItemFileInfo: (trackItemId: TrackItemId) => FileInfo | undefined;
}

export const ProjectFilesContext = createContext<ProjectFilesContextProps | undefined>(undefined);
