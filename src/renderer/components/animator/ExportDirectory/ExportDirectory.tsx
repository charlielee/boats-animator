import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { changeExportFrameDir } from "../../../services/userPreferences/UserPreferencesApi";
import Button from "../../common/Button/Button";
import "./ExportDirectory.css";

const ExportDirectory = (): JSX.Element => {
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );
  const dispatch = useDispatch();

  return (
    <div>
      <p className="export-directory__text">
        Captured frames will be exported to:
        <br />
        <span className="export-directory__name">
          {userPreferences.projectDefaults.exportFrameDir ||
            "No directory selected"}
        </span>
      </p>

      <Button
        title="Browse..."
        onClick={() => changeExportFrameDir(userPreferences, dispatch)}
      />
    </div>
  );
};

export default ExportDirectory;
