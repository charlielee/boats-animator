import { useDispatch, useSelector } from "react-redux";
import { changeWorkingDirectory } from "../../../redux/reducers/userPreferences/thunks";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import "./ExportDirectory.css";

const ExportDirectory = (): JSX.Element => {
  const { workingDirectory } = useSelector(
    (state: RootState) => state.userPreferences
  );
  const dispatch = useDispatch();

  return (
    <div>
      <p className="export-directory__text">
        Captured frames will be exported to:
        <br />
        <span className="export-directory__name">
          {workingDirectory || "No directory selected"}
        </span>
      </p>

      <Button
        title="Browse..."
        onClick={() => dispatch(changeWorkingDirectory(workingDirectory))}
      />
    </div>
  );
};

export default ExportDirectory;
