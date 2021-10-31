import { useDispatch, useSelector } from "react-redux";
import { IpcChannel } from "../../../../common/IpcApi";
import { editSettings } from "../../../redux/bundles/settings";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import "./ExportDirectory.css";

const ExportDirectory = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const updateFrameDir = () => {
    (async () => {
      const newDirectory = await window.preload.ipc[
        IpcChannel.SETTINGS_OPEN_DIR_DIALOG
      ](settings.exportFrameDir, "Select a directory to save captured frames");

      dispatch(
        editSettings({
          ...settings,
          exportFrameDir: newDirectory,
        })
      );
    })();
  };

  return (
    <div>
      <p className="export-directory__text">
        Captured frames will be exported to:
        <br />
        <span className="export-directory__name">
          {settings.exportFrameDir || "No directory selected"}
        </span>
      </p>

      <Button title="Browse..." onClick={updateFrameDir} />
    </div>
  );
};

export default ExportDirectory;
