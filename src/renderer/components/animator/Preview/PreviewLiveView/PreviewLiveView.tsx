import { useCallback } from "react";
import "./PreviewLiveView.css";

interface PreviewLiveViewProps {
  stream: MediaStream | undefined;
}

const PreviewLiveView = ({ stream }: PreviewLiveViewProps): JSX.Element => {
  const videoRef = useCallback(
    (video: HTMLVideoElement | null) => {
      if (video) {
        video.srcObject = stream ?? null;
      }
    },
    [stream]
  );

  return <video className="preview-live-view" autoPlay ref={videoRef}></video>;
};

export default PreviewLiveView;
