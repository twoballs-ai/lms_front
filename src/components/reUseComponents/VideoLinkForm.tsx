import React from 'react';
import PropTypes from 'prop-types';

const VideoLinkForm = ({ videoUrl, setVideoUrl }) => {
    const handleUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const embedVideo = () => {
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            const videoId = videoUrl.split('v=')[1] || videoUrl.split('/')[3];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (videoUrl.includes("rutube.ru")) {
            const videoId = videoUrl.split('video/')[1];
            return `https://rutube.ru/play/embed/${videoId}`;
        }
        // Add other platforms here
        return videoUrl;
    };

    return (
        <div className="video-link-form">
            <input
                type="text"
                placeholder="Вставьте ссылку на видео"
                value={videoUrl}
                onChange={handleUrlChange}
            />
            {videoUrl && (
                <div className="video-preview">
                    <iframe
                        width="560"
                        height="315"
                        src={embedVideo()}
                        title="Video preview"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

VideoLinkForm.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    setVideoUrl: PropTypes.func.isRequired
};

export default VideoLinkForm;