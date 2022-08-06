interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

export type Milliseconds = Flavor<number, "Milliseconds">;

export type FrameCount = Flavor<number, "FrameCount">;
export type FrameNumber = Flavor<number, "FrameNumber">;
export type FrameRate = Flavor<number, "FrameRate">;

export type TakeId = Flavor<string, "TakeId">;
export type TrackId = Flavor<string, "TrackId">;
export type TrackItemId = Flavor<string, "TrackItemId">;
export type TrackGroupId = Flavor<string, "TrackGroupId">;
