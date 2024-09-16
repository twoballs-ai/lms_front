import React from 'react';
import { Image } from 'antd';

const ImageViewer = ({ src, alt, ...rest }) => {
    return (
        <Image
            src={src}
            alt={alt}
            {...rest}
        />
    );
}

export default ImageViewer;