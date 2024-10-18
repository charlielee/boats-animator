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
}

export default FileManager;
