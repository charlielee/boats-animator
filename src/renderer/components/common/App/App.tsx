import { Navigate, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { FileManagerContextProvider } from "../../../context/FileManagerContext/FileManagerContextProvider";
import { PersistedDirectoriesContextProvider } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContextProvider";
import { Theme } from "../../ui/Theme/Theme";
import AppListener from "../AppListener/AppListener";
import { useAnimatorRoutesAndProviders } from "./useAnimatorRoutesAndProviders";
import { useStartupRoutes } from "./useStartupRoutes";
import { AppErrorBoundary } from "../AppErrorBoundary/AppErrorBoundary";
import { router } from "../../../router";

const App = (): JSX.Element => {
  // const startupRoutes = useStartupRoutes();
  // const animatorRoutes = useAnimatorRoutesAndProviders();

  return (
    <AppErrorBoundary>
      <AppListener />

      <FileManagerContextProvider>
        <PersistedDirectoriesContextProvider>
          {/* <Routes>
              <Route index element={<Navigate to={PageRoute.STARTUP} />} />
              {startupRoutes}
              {animatorRoutes}
            </Routes> */}
          <Outlet />
        </PersistedDirectoriesContextProvider>
      </FileManagerContextProvider>
    </AppErrorBoundary>
  );
};

export default App;
