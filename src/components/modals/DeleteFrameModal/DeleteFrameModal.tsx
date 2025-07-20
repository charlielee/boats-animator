import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { PageRoute } from "../../../services/PageRoute";

export const DeleteFrameModal = () => {
  const navigate = useNavigate();
  const { deleteFrameAtCurrentTimelineIndex, timelineIndex } = useContext(PlaybackContext);

  return (
    <UiModal title="Delete frame?" onClose={PageRoute.ANIMATOR}>
      <p>
        This will permanently delete{" "}
        {timelineIndex === undefined ? "the last frame captured" : `frame ${timelineIndex + 1}`}.
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
