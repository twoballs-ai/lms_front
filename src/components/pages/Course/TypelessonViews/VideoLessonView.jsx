import React, { useState, useEffect } from "react";

import ReactPlayer from "react-player";
function VideoLessonView(props) {
    let videoLessonContent = props.contentData.video_lesson;

    // console.log(props.contentData.content)
    return (
        <>
            <div className="mt-3 mx-3 h-75">
                <div>
                    Это видеоурок за который не начисляется энергия
                </div>
                <div>
                    <div>div Title</div>
                    <div.Subtitle className="mb-2 text-muted">
                        div Subtitle
                    </div.Subtitle>
                    <ReactPlayer url={videoLessonContent} controls={true} />
                </div>
            </div>
        </>
    );
}
export default VideoLessonView;
