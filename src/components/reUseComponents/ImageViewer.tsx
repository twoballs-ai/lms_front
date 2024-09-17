import React from 'react';
import { Image } from 'antd';

interface ImageViewerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any; // для передачи любых дополнительных пропсов
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, ...rest }) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...rest}
    />
  );
}

export default ImageViewer;
