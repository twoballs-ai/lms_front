import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ReactPlayer from "react-player";
function VideoLessonView(props) {
    let videoLessonContent = props.contentData.video_lesson;

    // console.log(props.contentData.content)
    return (
        <>
            <Card className="mt-3 mx-3 h-75">
                <Card.Header>
                Это видеоурок за который не начисляется энергия
                </Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                    </Card.Subtitle>
                    <ReactPlayer url={videoLessonContent} controls={true} />
                </Card.Body>
            </Card>
        </>
    );
}
export default VideoLessonView;
