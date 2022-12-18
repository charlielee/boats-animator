import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { PlaybackFrameName } from "../../../common/utils";

export const findRelativeTimelineIndex = (
  index: TimelineIndex | undefined,
  name: PlaybackFrameName,
  totalFrames: FrameCount
): TimelineIndex | undefined => {
  const lastIndex: TimelineIndex = totalFrames - 1;
  if (lastIndex < 0) {
    throw "No frames captured";
  }

  switch (name) {
    case PlaybackFrameName.FIRST:
      return 0;
    case PlaybackFrameName.PREVIOUS:
      return findPreviousFrame(index, lastIndex);
    case PlaybackFrameName.NEXT:
      return findNextFrame(index, lastIndex);
    case PlaybackFrameName.LAST:
      return findLastFrame(index, lastIndex);
  }
};

const findPreviousFrame = (
  index: TimelineIndex | undefined,
  lastIndex: TimelineIndex
) => {
  switch (index) {
    case undefined:
      return lastIndex;
    case 0:
      return index;
    default:
      return index - 1;
  }
};

const findNextFrame = (
  index: TimelineIndex | undefined,
  lastIndex: TimelineIndex
) =>
  isLiveView(index) || isLastIndex(index, lastIndex)
    ? undefined
    : (index ?? 0) + 1;

const findLastFrame = (
  index: TimelineIndex | undefined,
  lastIndex: TimelineIndex
) =>
  isLiveView(index) || isLastIndex(index, lastIndex) ? undefined : lastIndex;

export const isLiveView = (index: TimelineIndex | undefined) =>
  index === undefined;

const isLastIndex = (
  index: TimelineIndex | undefined,
  lastIndex: TimelineIndex
) => index === lastIndex;

export const findShortPlayStartFrame = (
  shortPlayLength: number,
  totalFrames: FrameCount
) => {
  const playFromFrame = totalFrames - shortPlayLength;
  return playFromFrame > 0 ? playFromFrame : 0;
};
