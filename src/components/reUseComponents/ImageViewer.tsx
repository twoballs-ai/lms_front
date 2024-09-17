import React from 'react';
import { Image, ImageProps } from 'antd';

interface ImageViewerProps extends ImageProps {
  src: string;
  alt: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, ...rest }) => {
  return <Image src={src} alt={alt} {...rest} />;
}

export default ImageViewer;
