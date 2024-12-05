import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getLastTrackItem } from "../../../../services/project/projectCalculator";
import PreviewFrame from "../PreviewFrame/PreviewFrame";
import { useContext } from "react";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../../hooks/useProjectAndTake";
import { ProjectFilesContext } from "../../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import { TrackItem } from "../../../../../common/project/TrackItem";

export const PreviewFrameOnionSkin = () => {
  const { take } = useProjectAndTake();
  const { liveViewVisible } = useContext(PlaybackContext);
  const { getTrackItemFileInfo } = useContext(ProjectFilesContext);

  const getTrackItemObjectURL = (trackItem: TrackItem) =>
    getTrackItemFileInfo!(trackItem.id)?.objectURL;

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);

  const onionSkinTrackItem = getLastTrackItem(take.frameTrack);
  const onionSkinSrc = onionSkinTrackItem ? getTrackItemObjectURL(onionSkinTrackItem) : undefined;

  const showOnionSkinFrame = liveViewVisible && onionSkinSrc !== undefined && enableOnionSkin;

  return (
    <PreviewFrame src={onionSkinSrc} opacity={showOnionSkinFrame ? onionSkinOpacity / 100 : 0} />
  );
};
