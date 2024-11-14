import { PageRoute } from "../../../../common/PageRoute";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiSelect } from "../../ui/UiSelect/UiSelect";

export const CaptureSourceModal = () => (
  <UiModal title="Capture Source Settings" onClose={PageRoute.ANIMATOR}>
    <UiSelect
      label="Capture Source"
      placeholder="No camera selected"
      data={[]}
      value={null}
      onChange={() => undefined}
    />
  </UiModal>
);
