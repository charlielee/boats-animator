import { useEffect, useRef } from "react";
import "./PreviewLiveView.css";

interface PreviewLiveViewProps {
  streaming: boolean;
  updateSrcObject(element: HTMLVideoElement): void;
}

const PreviewLiveView = ({
  streaming,
  updateSrcObject,
}: PreviewLiveViewProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && streaming) {
      updateSrcObject(videoRef.current);
    }
  }, [streaming]);

  return <video className="preview-live-view" autoPlay ref={videoRef}></video>;
};

export default PreviewLiveView;
