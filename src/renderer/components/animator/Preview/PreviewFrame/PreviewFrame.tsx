import { useEffect, useRef } from "react";
import "./PreviewFrame.css";

interface PreviewFrameProps {
  image: HTMLImageElement;
  videoWidth: number;
  videoHeight: number;
}

const PreviewFrame = ({
  image,
  videoWidth,
  videoHeight,
}: PreviewFrameProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    // context?.drawImage(image, 0, 0, videoWidth, videoHeight);
    context?.drawImage(image, 0, 0);
  }, []);

  return <canvas className="preview-frame" ref={canvasRef} />;
};

export default PreviewFrame;
