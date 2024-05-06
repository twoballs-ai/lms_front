import React, { useState, useEffect } from "react";

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
            <div className="mt-3 mx-3 h-75">
                <div>
                    Это классический урок за который не начисляется энергия
                </div>
                <div>
                    <div>div Title</div>
                    <div.Subtitle className="mb-2 text-muted">
                        div Subtitle
                    </div.Subtitle>
                    {textClassicLesson && htmlFrom(textClassicLesson)}
                    {/* <div dangerouslySetInnerHTML={{ __html: textClassicLesson }}></div> */}
                </div>
            </div>
        </>
    );
}
export default ClassicLessonView;
