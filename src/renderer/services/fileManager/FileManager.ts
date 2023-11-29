import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { zeroPad } from "../../../common/utils";
import { makeFrameFileName, makeTakeDirectoryName } from "../project/projectBuilder";

class FileManager {
  constructor(private projectHandle: FileSystemDirectoryHandle) {}

  saveTrackItemToDisk = async (take: Take, trackItem: TrackItem, blob: Blob): Promise<void> => {
    if (this.projectHandle === undefined) {
      return;
    }

    const takeHandle = await this.projectHandle.getDirectoryHandle(makeTakeDirectoryName(take), {
      create: true,
    });
    const fileHandle = await takeHandle.getFileHandle(
      makeFrameFileName(take, zeroPad(trackItem.fileNumber, 5)),
      { create: true }
    );

    const writable = await fileHandle.createWritable();
    await writable.write({ type: "write", data: blob });
    await writable.close();
  };
}

export default FileManager;
