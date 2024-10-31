import { useContext } from "react";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { PageRoute } from "../../../../common/PageRoute";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { UiButton } from "../../ui/UiButton/UiButton";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const DeleteFrameModal = () => {
  const navigate = useNavigate();
  const { deleteFrameAtCurrentTimelineIndex, timelineIndex } = useContext(PlaybackContext);

  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack?.trackItems.length === 0) {
    return;
  }

  return (
    <UiModal title="Delete frame" onClose={PageRoute.ANIMATOR}>
      <p>
        Are you sure you want to delete{" "}
        {timelineIndex === undefined ? "the last frame captured" : `frame ${timelineIndex + 1}`}?
      </p>
      <UiModalFooter>
        <UiButton onClick={PageRoute.ANIMATOR}>Cancel</UiButton>
        <UiButton
          onClick={async () => {
            await deleteFrameAtCurrentTimelineIndex?.();
            navigate(PageRoute.ANIMATOR);
          }}
          semanticColor={SemanticColor.DANGER}
        >
          Delete frame
        </UiButton>
      </UiModalFooter>
    </UiModal>
  );
};
