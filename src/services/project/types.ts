import { FileInfoType } from "../fileManager/FileInfo";
import {
  FileInfoId,
  FrameCount,
  FrameRate,
  IsoDateTimeString,
  TakeId,
  TimelineIndex,
  TrackGroupId,
  TrackId,
  TrackItemId,
} from "../Flavors";

interface ProjectInfoFileBase {
  schemaVersion: number;
}

export interface ProjectInfoFileV1 extends ProjectInfoFileBase {
  schemaVersion: 1;
  appVersion: string;
  project: Project;
  takes: Take[];
}

export interface Project {
  name: string;
  directoryName: string;
  projectFrameRate: number;
  lastSaved: IsoDateTimeString;
  fileInfoId: FileInfoId;
}

export interface Take {
  id: TakeId;
  shotNumber: number;
  takeNumber: number;
  frameRate: FrameRate;
  holdFrames: FrameCount;
  frameTrack: Track;
  lastSaved: IsoDateTimeString;
}

export interface Track {
  id: TrackId;
  fileType: FileInfoType;
  trackItems: TrackItem[];
}

export interface TrackItem {
  id: TrackItemId;
  length: FrameCount;
  fileName: string;
  fileNumber: TimelineIndex;
  trackGroupId: TrackGroupId;
  fileInfoId: FileInfoId;
}
