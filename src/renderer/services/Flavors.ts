interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

export type Primitive = string | number | boolean | undefined | NumberFlavor | StringFlavor;

export type FrameCount = Flavor<number, "FrameCount">;
export type FrameRate = Flavor<number, "FrameRate">;
export type TimelineIndex = Flavor<number, "TimelineIndex">;
type NumberFlavor = FrameCount | FrameRate | TimelineIndex;

export type IsoDateTimeString = Flavor<string, "IsoDateTimeString">;

export type PersistedDirectoryId = Flavor<string, "PersistedDirectoryId">;
export type FileInfoId = Flavor<string, "FileInfoId">;

export type TakeId = Flavor<string, "TakeId">;
export type TrackId = Flavor<string, "TrackId">;
export type TrackItemId = Flavor<string, "TrackItemId">;
export type TrackGroupId = Flavor<string, "TrackGroupId">;

type StringFlavor =
  | IsoDateTimeString
  | PersistedDirectoryId
  | FileInfoId
  | TakeId
  | TrackId
  | TrackItemId
  | TrackGroupId;
