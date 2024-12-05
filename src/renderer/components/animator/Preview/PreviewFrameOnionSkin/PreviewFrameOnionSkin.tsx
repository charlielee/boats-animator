import { useContext } from "react";
import { useSelector } from "react-redux";
import { TrackItem } from "../../../../../common/project/TrackItem";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { ProjectFilesContext } from "../../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import useProjectAndTake from "../../../../hooks/useProjectAndTake";
import { RootState } from "../../../../redux/store";
import PreviewFrame from "../PreviewFrame/PreviewFrame";

export const PreviewFrameOnionSkin = () => {
  const { take } = useProjectAndTake();
  const { liveViewVisible } = useContext(PlaybackContext);
  const { getTrackItemFileInfo } = useContext(ProjectFilesContext);

  const getTrackItemObjectURL = (trackItem: TrackItem) =>
    getTrackItemFileInfo!(trackItem.id)?.objectURL;

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);

  const onionSkinFramesVisible = useSelector(
    (state: RootState) => state.project.onionSkinFramesVisible
  );
  const trackItems = take.frameTrack.trackItems.slice(onionSkinFramesVisible * -1);

  const showOnionSkinFrames = liveViewVisible && enableOnionSkin;

  // todo handle not showing onion skin when rapid capture (probably due to getTrackItemFileInfo being undefined)
  console.log(trackItems);

  if (showOnionSkinFrames) {
    return trackItems.map((trackItem) => (
      <PreviewFrame
        src={getTrackItemObjectURL(trackItem)}
        opacity={onionSkinOpacity / 100}
        key={trackItem.id}
      />
    ));
  }
};
