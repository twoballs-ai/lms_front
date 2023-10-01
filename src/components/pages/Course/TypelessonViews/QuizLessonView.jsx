import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { renderToString } from "react-dom/server";
import Form from "react-bootstrap/Form";
function QuizLessonView(props) {
    let quizLessonAnswer = props.contentData.content;
    const cboxes = ["check1", "check2"];
    // специальная функция для защиты пользовательского кода от хакерских атак.
    const htmlFrom = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString, {
            USE_PROFILES: { html: true },
        });
        const html = parse(cleanHtmlString);
        return html;
    };
    console.log(props.contentData);
    return (
        <>
            <Card className="mt-3 mx-3 h-75">
                <Card.Header>
                Это урок викторина за него может начисляться энергия от 0 до 5
                </Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                    </Card.Subtitle>
                    {quizLessonAnswer && htmlFrom(quizLessonAnswer)}
                    {/* <div dangerouslySetInnerHTML={{ __html: textClassicLesson }}></div> */}
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Выберите правильный ответ.</Form.Label>
                            <Form.Check
                                label={props.contentData.answer1}
                                name="group1"
                                type="radio"
                                id={props.contentData.answer1}
                                // id={`reverse-${type}-1`}
                            />
                            <Form.Check
                                label={props.contentData.answer2}
                                name="group1"
                                type="radio"
                                id={props.contentData.answer2}
                            />
                            <Form.Check
                                label={props.contentData.answer3}
                                name="group1"
                                type="radio"
                                id={props.contentData.answer3}
                            />
                            <Form.Check
                                label={props.contentData.answer4}
                                name="group1"
                                type="radio"
                                id={props.contentData.answer4}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default QuizLessonView;
