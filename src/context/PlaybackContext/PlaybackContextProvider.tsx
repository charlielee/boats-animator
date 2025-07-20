import { ReactNode, useRef } from "react";
import useLinkedRefAndState from "../../hooks/useLinkedRefAndState";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFrame";
import {
  getHighlightedTrackItem,
  getLastTrackItem,
  getTrackLength,
} from "../../services/project/projectCalculator";
import * as rLogger from "../../services/rLogger/rLogger";
import { PlaybackContext, PlaybackContextProps, PlaybackFrameName } from "./PlaybackContext";
import { useProjectFilesContext } from "../ProjectFilesContext.tsx/ProjectFilesContext";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TimelineIndex } from "../../services/Flavors";

interface PlaybackContextProviderProps {
  children: ReactNode;
}

const PlaybackContextProvider = ({ children }: PlaybackContextProviderProps) => {
  const take = useSelector((state: RootState) => state.project.take);
  if (take === undefined) {
    throw "PlaybackContext requires a take";
  }

  const { deleteTrackItem } = useProjectFilesContext();

  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);
  const enableShortPlay = useSelector((state: RootState) => state.project.enableShortPlay);

  const playForDuration = getTrackLength(take.frameTrack);

  // An `undefined` timeline index indicates the application is showing the live view
  const [timelineIndex, timelineIndexRef, setTimelineIndex] = useLinkedRefAndState<
    TimelineIndex | undefined
  >(undefined);
  const [playing, playingRef, setPlaying] = useLinkedRefAndState(false);

  const delay = 1000 / take.frameRate / playbackSpeed;
  const previousTime = useRef<number>(0);
  const lastFrameIndex = useRef<TimelineIndex>(0);

  const [startRAF, stopRAF] = useRequestAnimationFrame((newTime) => {
    if (!playingRef.current) {
      previousTime.current = newTime;
      setPlaying(true);
    }

    const incrementIfExceedsTime = Math.floor(previousTime.current + delay);

    if (timelineIndexRef.current === undefined || newTime >= incrementIfExceedsTime) {
      previousTime.current = newTime;

      switch (timelineIndexRef.current) {
        case undefined:
          setTimelineIndex(0);
          break;
        case lastFrameIndex.current:
          stopPlayback();
          break;
        default:
          setTimelineIndex(timelineIndexRef.current + 1);
          break;
      }
    }
  });

  const startOrPausePlayback = () => {
    if (playing) {
      return _pausePlayback();
    }

    if (enableShortPlay) {
      return _shortPlay();
    } else {
      return _startPlayback();
    }
  };

  const stopPlayback = (i?: TimelineIndex | undefined) => {
    _logPlayback("playback.stopPlayback");
    stopRAF();
    setPlaying(false);

    if (i === undefined || playForDuration === 0) {
      setTimelineIndex(undefined);
    } else {
      setTimelineIndex(i);
    }
  };

  const displayFrame = (name: PlaybackFrameName) => {
    switch (name) {
      case PlaybackFrameName.FIRST:
        return _displayFirstFrame();
      case PlaybackFrameName.PREVIOUS:
        return _displayPreviousFrame();
      case PlaybackFrameName.NEXT:
        return _displayNextFrame();
      case PlaybackFrameName.LAST:
        return _displayLastFrame();
    }
  };

  const deleteFrameAtCurrentTimelineIndex = async () => {
    const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);
    const trackItem = highlightedTrackItem ?? getLastTrackItem(take.frameTrack);
    if (trackItem === undefined) {
      rLogger.info(
        "playback.deleteFrameAtCurrentTimelineIndex.noAction",
        "nothing was deleted as no track items found"
      );
      return;
    }

    stopPlayback();
    rLogger.info(
      "playback.deleteFrameAtCurrentTimelineIndex.deleted",
      `deleted track item ${trackItem.fileName}`
    );
    await deleteTrackItem(trackItem);
    notifications.show({ message: "Deleted frame" });
  };

  const _startPlayback = () => {
    _logPlayback("playback.startPlayback");
    if (playForDuration > 0) {
      lastFrameIndex.current = playForDuration - 1;
      startRAF();
    }
  };

  const _shortPlay = () => {
    _logPlayback("playback.shortPlay");
    const playFromFrame = playForDuration - shortPlayLength;

    if (playFromFrame > 0) {
      stopPlayback(playFromFrame);
    } else {
      stopPlayback(0);
    }
    _startPlayback();
  };

  const _pausePlayback = () => {
    _logPlayback("playback.pausePlayback");
    stopPlayback(timelineIndex);
  };

  const _displayFirstFrame = () => {
    _logPlayback("playback.displayFirstFrame");
    stopPlayback(0);
  };

  const _displayPreviousFrame = () => {
    _logPlayback("playback.displayPreviousFrame");

    if (timelineIndex === undefined) {
      return stopPlayback(playForDuration - 1);
    }
    if (timelineIndex > 0) {
      return stopPlayback(timelineIndex - 1);
    }
  };

  const _displayNextFrame = () => {
    _logPlayback("playback.displayNextFrame");

    if (timelineIndex === playForDuration - 1) {
      return stopPlayback(undefined);
    }
    if (timelineIndex !== undefined) {
      return stopPlayback(timelineIndex + 1);
    }
  };

  const _displayLastFrame = () => {
    _logPlayback("playback.displayLastFrame");

    if (timelineIndex === playForDuration - 1) {
      return stopPlayback(undefined);
    }
    if (timelineIndex !== undefined) {
      return stopPlayback(playForDuration - 1);
    }
  };

  const _logPlayback = (loggingCode: string) =>
    rLogger.info(loggingCode, {
      playForDuration,
      frameRate: take.frameRate,
      timelineIndex: timelineIndexRef.current ?? "(showing live view)",
    });

  const value: PlaybackContextProps = {
    startOrPausePlayback,
    stopPlayback,
    displayFrame,
    deleteFrameAtCurrentTimelineIndex,
    timelineIndex,
    liveViewVisible: timelineIndex === undefined,
    playing,
  };

  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
};

export default PlaybackContextProvider;
