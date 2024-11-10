import { Component, ErrorInfo, ReactNode } from "react";
import * as rLogger from "../../../services/rLogger/rLogger";

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
      error: event.message,
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
      return <p>Unexpected error</p>;
    }

    return this.props.children;
  }
}
