import { useEffect, useRef } from "react";
import "./PreviewLiveView.css";

interface PreviewLiveViewProps {
  stream: MediaStream | undefined;
}

const PreviewLiveView = ({ stream }: PreviewLiveViewProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream ?? null;
    }
  }, [stream]);

  return <video className="preview-live-view" autoPlay ref={videoRef}></video>;
};

export default PreviewLiveView;
