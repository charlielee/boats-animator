import { useEffect, useRef, useState } from "react";
import "./PreviewFrame.css";

interface PreviewFrameProps {
  src: string | undefined;
  opacity: number;
}

const PreviewFrame = ({ src, opacity }: PreviewFrameProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const drawImage = () => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      return;
    }

    context?.drawImage(imageRef.current, 0, 0);
  };

  useEffect(() => {
    if (src === undefined) {
      return;
    }
    const image = imageRef.current;
    image.src = src;
    image.addEventListener("load", drawImage);
    setImageWidth(image.naturalWidth);
    setImageHeight(image.naturalHeight);

    return () => image.removeEventListener("load", drawImage);
  }, [src]);

  useEffect(() => {
    drawImage();
  }, [imageWidth, imageHeight]);

  return (
    <canvas
      className="preview-frame"
      ref={canvasRef}
      width={imageWidth}
      height={imageHeight}
      style={{ opacity }}
    />
  );
};

export default PreviewFrame;
