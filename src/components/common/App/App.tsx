import { Outlet } from "react-router-dom";
import { FileManagerContextProvider } from "../../../context/FileManagerContext/FileManagerContextProvider";
import { PersistedDirectoriesContextProvider } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContextProvider";
import { AppErrorBoundary } from "../AppErrorBoundary/AppErrorBoundary";
import AppListener from "../AppListener/AppListener";

const App = () => (
  <AppErrorBoundary>
    <AppListener />

    <FileManagerContextProvider>
      <PersistedDirectoriesContextProvider>
        <Outlet />
      </PersistedDirectoriesContextProvider>
    </FileManagerContextProvider>
  </AppErrorBoundary>
);

export default App;
