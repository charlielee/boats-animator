import { useEffect, useRef } from "react";
import "./PreviewLiveView.css";

interface PreviewLiveViewProps {
  streaming: boolean;
  stream: MediaStream | undefined;
}

const PreviewLiveView = ({
  streaming,
  stream,
}: PreviewLiveViewProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && streaming && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, streaming]);

  return <video className="preview-live-view" autoPlay ref={videoRef}></video>;
};

export default PreviewLiveView;

// const attachStreamToVideo = (element: HTMLVideoElement) => {
//   if (device.current?.stream) {
//     element.srcObject = device.current.stream;
//   }
// };
