import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { zeroPad } from "../../../common/utils";
import * as rLogger from "../../services/rLogger/rLogger";
import { makeFrameFileName, makeTakeDirectoryName } from "../project/projectBuilder";

class FileManager {
  constructor(private projectHandle: FileSystemDirectoryHandle) {}

  saveTrackItemToDisk = async (take: Take, trackItem: TrackItem, blob: Blob): Promise<void> => {
    if (this.projectHandle === undefined) {
      return;
    }

    const takeDirectory = makeTakeDirectoryName(take);
    const frameFileName = makeFrameFileName(take, zeroPad(trackItem.fileNumber, 5));
    rLogger.info("fileManager.saveTrackItemToDisk", {
      takeDirectory: takeDirectory,
      frameFileName: frameFileName,
    });

    const takeHandle = await this.projectHandle.getDirectoryHandle(takeDirectory, {
      create: true,
    });
    const fileHandle = await takeHandle.getFileHandle(frameFileName, { create: true });

    const writable = await fileHandle.createWritable();
    await writable.write({ type: "write", data: blob });
    await writable.close();
  };

  static openDirectoryDialogHandleCancel = async (
    id: string
  ): Promise<FileSystemDirectoryHandle | undefined> => {
    try {
      const handle = await this.openDirectoryDialog(id);
      return handle;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        rLogger.info("fileManager.cancelledDirectoryDialog", `Cancelled directory dialog id ${id}`);
      } else {
        throw e;
      }
    }
  };

  private static openDirectoryDialog = async (id: string): Promise<FileSystemDirectoryHandle> => {
    rLogger.info("fileManager.openDirectoryDialog", `Opened directory dialog id ${id}`);
    const directoryHandle = await window.showDirectoryPicker({
      id,
      mode: "readwrite",
      startIn: "documents",
    });
    rLogger.info(
      "fileManager.selectedDirectory",
      `Selected directory ${directoryHandle.name} for id ${id}`
    );
    return directoryHandle;
  };
}

export default FileManager;
