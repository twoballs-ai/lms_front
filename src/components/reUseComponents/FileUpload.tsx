"use client"; // Обязательно для клиентского рендеринга
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // Импорт useDropzone из библиотеки
import Image from 'next/image'; // Для работы с изображениями в Next.js

const FileUpload = ({ fileType = 'image', selectionMode = 'multiple', onFilesChange, errors }) => {
    const [files, setFiles] = useState([]);

    // Функция для обработки файлов
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

    // Настройка dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getFileAcceptType(fileType),
        multiple: selectionMode === 'multiple'
    });

    return (
        <div>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <p>Перетащите {fileType === 'image' ? 'изображения' : (fileType === 'video' ? 'видео' : 'файлы')} сюда или нажмите для выбора</p>
                {isDragActive ? (
                    <p>Отпустите {selectionMode === 'multiple' ? 'файлы' : 'файл'} здесь...</p>
                ) : (
                    <p>Вы можете загрузить {selectionMode === 'multiple' ? 'несколько файлов' : 'один файл'}</p>
                )}
            </div>
            {errors && <div className="error-message">{errors}</div>}
            <div className="upload-preview">
                {files.map(({ preview, name, size, type }, index) => (
                    <div key={index}>
                        <Image
                            src={preview}
                            alt={name}
                            width={100}
                            height={100}
                            style={{ margin: '10px' }}
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

// Функция для определения поддерживаемых форматов файлов
const getFileAcceptType = (fileType) => {
    switch (fileType) {
        case 'image':
            return {'image/*': ['.jpeg', '.jpg', '.png']};
        case 'video':
            return 'video/mp4, video/x-m4v, video/webm, video/ogg, video/quicktime';
        case 'pdf':
            return 'application/pdf';
        default:
            return undefined;
    }
};

export default FileUpload;
