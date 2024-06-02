import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.scss';

const FileUpload = ({ fileType = 'image', selectionMode = 'multiple', onFilesChange }) => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const filesWithPreviews = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type
        }));
        setFiles(filesWithPreviews);
        onFilesChange(filesWithPreviews);
    }, [onFilesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getFileAcceptType(fileType),
        multiple: selectionMode === 'multiple'
    });

    return (
        <div>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <p>Перетащите {fileType === 'image' ? 'изображения' : (fileType === 'video' ? 'видео' : 'документы')} сюда или нажмите для выбора</p>
                {isDragActive ? (
                    <p>Отпустите {selectionMode === 'multiple' ? 'изображения' : 'изображение'} здесь...</p>
                ) : (
                    <p>Вы можете загрузить {selectionMode === 'multiple' ? 'несколько' : 'одно'} {fileType === 'image' ? 'изображений' : (fileType === 'video' ? 'видео' : 'документов')}.</p>
                )}
            </div>
            <div className="upload-preview">
                {files.map(({ file, preview, name, size, type }, index) => (
                    <div key={index}>
                        <img
                            src={preview}
                            alt={name}
                            style={{ width: '100px', margin: '10px' }}
                        />
                        <p>Имя: {name}</p>
                        <p>Размер: {size} байт</p>
                        <p>Тип: {type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getFileAcceptType = (fileType) => {
    switch (fileType) {
        case 'image':
            return 'image/jpeg, image/png, image/gif, image/webp';
        case 'video':
            return 'video/mp4, video/x-m4v, video/*';
        case 'pdf':
            return 'application/pdf';
        default:
            return '*/*';
    }
};

export default FileUpload;