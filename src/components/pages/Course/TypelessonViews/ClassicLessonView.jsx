import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { renderToString } from "react-dom/server";
function ClassicLessonView(props) {
    let textClassicLesson = props.contentData.content;

    // специальная функция для защиты пользовательского кода от хакерских атак.
    const htmlFrom = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString, {
            USE_PROFILES: { html: true },
        });
        const html = parse(cleanHtmlString);
        return html;
    };
    // console.log(props.contentData.content)
    return (
        <>
            <Card className="mt-3 mx-3 h-75">
                <Card.Header>
               Это классический урок за который не начисляется энергия
                </Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                    </Card.Subtitle>
                    {textClassicLesson && htmlFrom(textClassicLesson)}
                    {/* <div dangerouslySetInnerHTML={{ __html: textClassicLesson }}></div> */}
                </Card.Body>
            </Card>
        </>
    );
}
export default ClassicLessonView;
