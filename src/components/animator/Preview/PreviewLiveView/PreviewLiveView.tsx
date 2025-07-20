import { useCallback } from "react";
import "./PreviewLiveView.css";

interface PreviewLiveViewProps {
  stream: MediaStream | undefined;
  opacity: number;
}

export const PreviewLiveView = ({ stream, opacity }: PreviewLiveViewProps) => {
  const videoRef = useCallback(
    (video: HTMLVideoElement | null) => {
      if (video) {
        video.srcObject = stream ?? null;
      }
    },
    [stream]
  );

  return <video className="preview-live-view" autoPlay ref={videoRef} style={{ opacity }}></video>;
};
