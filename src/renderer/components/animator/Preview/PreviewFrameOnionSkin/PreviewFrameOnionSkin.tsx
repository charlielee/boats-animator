import { useContext } from "react";
import { useSelector } from "react-redux";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { ProjectFilesContext } from "../../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import useProjectAndTake from "../../../../hooks/useProjectAndTake";
import { RootState } from "../../../../redux/store";
import {
  calculateOnionSkinFrameOpacity,
  getOnionSkinTrackItems,
} from "../../../../services/onionSkin/onionSkinCalculator";
import PreviewFrame from "../PreviewFrame/PreviewFrame";

export const PreviewFrameOnionSkin = () => {
  const { take } = useProjectAndTake();
  const { liveViewVisible } = useContext(PlaybackContext);
  const { getTrackItemObjectURL } = useContext(ProjectFilesContext);

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);
  const onionSkinFramesVisible = useSelector(
    (state: RootState) => state.project.onionSkinFramesVisible
  );

  const trackItems = getOnionSkinTrackItems(take.frameTrack, onionSkinFramesVisible);
  const showOnionSkinFrames = liveViewVisible && enableOnionSkin;

  // todo why does this render so many times on load
  if (showOnionSkinFrames) {
    return trackItems.map((trackItem, i) => (
      <PreviewFrame
        src={getTrackItemObjectURL?.(trackItem)}
        opacity={calculateOnionSkinFrameOpacity(onionSkinOpacity, i)}
        key={trackItem.id}
      />
    ));
  }
};
