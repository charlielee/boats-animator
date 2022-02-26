interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

export type FrameCount = Flavor<number, "FrameCount">;

export type TakeId = Flavor<string, "TakeId">;
export type TrackId = Flavor<string, "TrackId">;
export type TrackItemId = Flavor<string, "TrackItemId">;
export type TrackFileId = Flavor<string, "TrackFileId">;
