import { Component, ErrorInfo, ReactNode } from "react";
import * as rLogger from "../../../services/rLogger/rLogger";
import { UiModal } from "../../ui/UiModal/UiModal";
import { FileErrorBase } from "../../../context/FileManagerContext/FileErrors";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  error: unknown;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: undefined };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    rLogger.error(
      "appErrorBoundary.componentError",
      JSON.stringify({ name: error.name, message: error.message, ...errorInfo })
    );
  }

  private handlePromiseRejected = (event: PromiseRejectionEvent) => {
    this.setState({
      error: event.reason,
    });
    rLogger.error("appErrorBoundary.promiseRejected", JSON.stringify({ reason: event.reason }));
  };

  private handleError = (event: ErrorEvent) => {
    this.setState({
      error: event.error,
    });
    rLogger.error(
      "appErrorBoundary.handleError",
      JSON.stringify({ error: event.error, message: event.message })
    );
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.handlePromiseRejected);
    window.addEventListener("error", this.handleError);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.handlePromiseRejected);
    window.removeEventListener("error", this.handleError);
  }

  public render() {
    if (this.state.error !== undefined) {
      const error = this.state.error;

      if (error instanceof FileErrorBase) {
        return (
          <UiModal title="Unexpected File Error">
            <p>
              Unable to {error.action} &quot;{error.filePath}&quot;, please restart Boats Animator.
              Please ensure that this project&quot;s files have not been modified or moved outside
              of Boats Animator.
            </p>
            <p>
              Your project has been automatically saved. If this error keeps occurring, please raise
              an issue on GitHub.
            </p>
          </UiModal>
        );
      }

      return (
        <UiModal title="Unexpected Error">
          <p>There was an unexpected error, please restart Boats Animator.</p>
          <p>
            Your project has been automatically saved. If this error keeps occurring, please raise
            an issue on GitHub.
          </p>
        </UiModal>
      );
    }

    return this.props.children;
  }
}
