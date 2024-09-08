import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';

const YouTubeLinkForm = ({ videoUrl, setVideoUrl }) => {
    const [form] = Form.useForm();
    const [url, setUrl] = useState(videoUrl);

    useEffect(() => {
        setUrl(videoUrl);
    }, [videoUrl]);

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setUrl(url);

        if (url) {
            const videoId = extractVideoId(url);
            if (videoId) {
                setVideoUrl(url);  // Передаем полный URL
            } 
        } else {
            setVideoUrl('');
        }
    };

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                name="youtube_video_form"
            >
                <Input
                    placeholder="Вставьте ссылку с YouTube"
                    onChange={handleUrlChange}
                    value={url}
                />
            </Form>
            {url && extractVideoId(url) && (
                <div style={{ marginTop: 20 }}>
                    <h3>Видео с YouTube:</h3>
                    <iframe
                        width="660"
                        height="415"
                        src={`https://www.youtube.com/embed/${extractVideoId(url)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default YouTubeLinkForm;