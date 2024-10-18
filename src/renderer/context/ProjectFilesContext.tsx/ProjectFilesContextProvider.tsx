import { ReactNode, useContext, useState } from "react";
import { ProjectFilesContext } from "./ProjectFilesContext";
import { FileInfo } from "../../services/fileManager/FileInfo";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoId, TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { makeTakeDirectoryName, makeFrameFileName } from "../../services/project/projectBuilder";
import { zeroPad } from "../../../common/utils";
import { FileRefType } from "../../../common/FileRef";

interface ProjectFilesContextProviderProps {
  children: ReactNode;
}

export const ProjectFilesContextProvider = ({ children }: ProjectFilesContextProviderProps) => {
  const { fileManager } = useContext(FileManagerContext);
  const projectDirectory = useProjectDirectory();
  if (fileManager === undefined) {
    throw "Missing fileManager";
  }
  const [trackItemFiles, setTrackItemFiles] = useState<Record<TrackItemId, FileInfoId>>({});

  const saveTrackItemToDisk = async (
    take: Take,
    trackItem: TrackItem,
    data: Blob
  ): Promise<void> => {
    if (projectDirectory === undefined) {
      throw "Missing projectDirectory";
    }

    const takeDirectoryName = makeTakeDirectoryName(take);
    const takeDirectoryHandle = await fileManager.current.createDirectory(
      takeDirectoryName,
      projectDirectory.handle
    );
    const frameFileName = makeFrameFileName(take, zeroPad(trackItem.fileNumber, 5));
    const { fileInfoId } = await fileManager.current.createFile(
      frameFileName,
      takeDirectoryHandle,
      FileRefType.FRAME,
      data
    );
    setTrackItemFiles((p) => ({ ...p, [trackItem.id]: fileInfoId }));
  };

  const getTrackItemFileInfo = (trackItemId: TrackItemId): FileInfo | undefined =>
    fileManager.current.findFile(trackItemFiles[trackItemId]);

  return (
    <ProjectFilesContext.Provider value={{ saveTrackItemToDisk, getTrackItemFileInfo }}>
      {children}
    </ProjectFilesContext.Provider>
  );
};
