import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Figure from "react-bootstrap/Figure";
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { apiUrl, typesApiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
import AddingCodeLesson from "./TypeLessonForm/CodeLesson";
import EditClassicLesson from "./TypeLessonForm/Edit/ClassicLessonEdit";
import EditQuizLesson from "./TypeLessonForm/Edit/QuizLessonEdit";
import EditVideoLesson from "./TypeLessonForm/Edit/VideoLessonEdit";
function EditModuleStage() {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    const [moduleData, setModuleData] = useState([]);
    const [stagePk, setStagePk] = useState("");
    const [contentData, setContentData] = useState([]);
    const [typeStageData, setTypeStageData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    // const {state} = useLocation();
    // const { type } = state;
    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "module-stage/" + module_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    console.log(response.data);
                    setModuleData(response.data);

                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl + `module-stage-detail/${module_id}/${stage_id}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    console.log(response)
                    setTypeStageData(response.data.type);
                    setStagePk(response.data.id)
                });
        } catch (error) {
            console.log(error);
        }
    }, [module_id, navigate, location]);
    const addStage = () => {
        try {
            axios
                .post(
                    apiUrl + "module-stage/" + module_id,
                    {
                        module: module_id,
                        stage_numbers: moduleData.length + 1,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data);
                        navigate(
                            `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${response.data.stage_numbers}`
                        );
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(location);
    console.log(typeStageData);
    return (
        <>
            <Row>
                <p>Вы перешли на страницу редактирования модуля</p>
                <Col>
                    <div className="ms-3">
                        {moduleData.map((tech, index) => (
                            <Link
                                to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${tech.stage_numbers}`}
                            >
                                <div className="dot ms-3">
                                    {tech.type !== null && (
                                        <>
                                            {tech.type.is_classic === true && (
                                                <p>classic</p>
                                            )}
                                            {tech.type.is_quiz === true && (
                                                <p>quiz</p>
                                            )}
                                            {tech.type.is_video === true && (
                                                <p>video</p>
                                            )}
                                        </>
                                    )}
                                    {tech.type === null && <p>пустой урок</p>}
                                </div>
                            </Link>
                        ))}
                        {moduleData.length < 20 && (
                            <Link onClick={addStage}>
                                <div className="dot ms-3">
                                    <div className="mt-1">
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            transform="down-6 grow-3"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    Вы находитесь на странице редактирования этапа обучения
                </Col>
                {typeStageData === null ? (
                    <>
                        <p>Вы еще не заполнили ваш урок. </p>
                        <div className="mb-2">
                            <Button
                                as={Link}
                                to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}/new`}
                                variant="outline-success"
                            >
                                добавить урок
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {typeStageData.is_classic === true ? (
                            <EditClassicLesson
                                stage_id={stage_id}
                                contentData={contentData}
                            />
                        ) : (
                            <>
                                {typeStageData.is_quiz === true ? (
                                    <EditQuizLesson stage_id={stage_id} />
                                ) : (
                                    <>
                                        {typeStageData.is_video === true ? (
                                            <EditVideoLesson
                                                stage_id={stage_id}
                                            />
                                        ) : (
                                            <p></p>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                {/* {AddingLesson()} */}
                {location.state === null ? (
                    <></>
                ) : (
                    <>
                        {location.state.type === "classicLesson" ? (
                            <>
                                <AddingClassicLesson stagePk={stagePk} />
                            </>
                        ) : (
                            <>
                                {" "}
                                {location.state.type === "quizLesson" ? (
                                    <AddingQuizLesson stagePk={stagePk} />
                                ) : (
                                    <>
                                        {" "}
                                        {location.state.type ===
                                        "videoLesson" ? (
                                            <AddingVideoLesson
                                            stagePk={stagePk}
                                            />
                                        ) : (
                                            <>
                                                {" "}
                                                {location.state.type ===
                                                "codingLesson" ? (
                                                    <AddingCodeLesson
                                                    stagePk={stagePk}
                                                    />
                                                ) : (
                                                    <>
                                                        <p>
                                                            Для добавления урока
                                                            нажмите добавить
                                                            урок
                                                        </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {/* {location.state != null && (<>{location.state.type === "classicLesson" &&(<p>Для добавлен на кнопку добавить урок </p>)}</>)} */}
            </Row>
        </>
    );
}
export default EditModuleStage;
