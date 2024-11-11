import { Navigate, Route, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { FileManagerContextProvider } from "../../../context/FileManagerContext/FileManagerContextProvider";
import { PersistedDirectoriesContextProvider } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContextProvider";
import { Theme } from "../../ui/Theme/Theme";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";
import { useAnimatorRoutesAndProviders } from "./useAnimatorRoutesAndProviders";
import { useStartupRoutes } from "./useStartupRoutes";
import { AppErrorBoundary } from "../AppErrorBoundary/AppErrorBoundary";

const App = (): JSX.Element => {
  const startupRoutes = useStartupRoutes();
  const animatorRoutes = useAnimatorRoutesAndProviders();

  return (
    <Theme>
      <AppErrorBoundary>
        <AppListener />
        <AppLoad />

        <FileManagerContextProvider>
          <PersistedDirectoriesContextProvider>
            <Routes>
              <Route index element={<Navigate to={PageRoute.STARTUP} />} />
              {startupRoutes}
              {animatorRoutes}
            </Routes>
          </PersistedDirectoriesContextProvider>
        </FileManagerContextProvider>
      </AppErrorBoundary>
    </Theme>
  );
};

export default App;
