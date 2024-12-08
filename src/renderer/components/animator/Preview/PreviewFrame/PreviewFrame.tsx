import { useEffect, useRef } from "react";
import "./PreviewFrame.css";

interface PreviewFrameProps {
  src: string | undefined;
  opacity: number;
}

const PreviewFrame = ({ src, opacity }: PreviewFrameProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  const drawImage = () => {
    if (canvasRef.current) {
      canvasRef.current.width = imageRef.current.naturalWidth;
      canvasRef.current.height = imageRef.current.naturalHeight;
    }

    const context = canvasRef.current?.getContext("2d");
    context?.drawImage(imageRef.current, 0, 0);
  };

  useEffect(() => {
    if (src === undefined) {
      return;
    }
    const image = imageRef.current;
    image.src = src;
    image.addEventListener("load", drawImage);

    return () => image.removeEventListener("load", drawImage);
  }, [src]);

  return <canvas className="preview-frame" ref={canvasRef} style={{ opacity }} />;
};

export default PreviewFrame;
