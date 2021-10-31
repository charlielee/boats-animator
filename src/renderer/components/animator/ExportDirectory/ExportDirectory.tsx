import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { changeExportFrameDir } from "../../../services/settings/SettingsApi";
import Button from "../../common/Button/Button";
import "./ExportDirectory.css";

const ExportDirectory = (): JSX.Element => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return (
    <div>
      <p className="export-directory__text">
        Captured frames will be exported to:
        <br />
        <span className="export-directory__name">
          {settings.projectDefaults.exportFrameDir || "No directory selected"}
        </span>
      </p>

      <Button
        title="Browse..."
        onClick={() => changeExportFrameDir(settings, dispatch)}
      />
    </div>
  );
};

export default ExportDirectory;
