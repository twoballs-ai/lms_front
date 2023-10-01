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
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
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
    const [stagePkData, setStagePkData] = useState("");
    const [typeStageData, setTypeStageData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const styleIndex = {
        left:"26px",
        top:"-20px",
    
      };
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
                    // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                    setStagePkData(response.data[parseInt(stage_id)-1] && response.data[parseInt(stage_id)-1]["id"])
                    // setTypeStageData()
                    // setStagePk(response.data.id);
                });
        } catch (error) {
            console.log(error);
        }
    }, [module_id,stage_id, navigate, location]);
    const addStage = () => {
        try {
            axios
                .post(
                    apiUrl + "module-stage/" + module_id,
                    {
                        module: module_id,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data);
                        navigate(
                            `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${parseInt(stage_id)+1}`
                        );
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const deleteStage = ()=>{
        try {
            axios
                .delete(
                    apiUrl + `module-stage-detail/${module_id}/${stagePkData}`,
                  
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 204) {
                        console.log(response);
                        navigate(
                            `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${parseInt(stage_id)}`
                        );
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    console.log(moduleData[stage_id-1] && moduleData[stage_id-1]["type"]);
    console.log(stagePkData);
    console.log(stage_id);
  
    return (
        <>
      
                <p className="mt-2">Вы перешли на страницу редактирования модуля</p>
                <Col>
                    <div className="ms-3">
                        {moduleData.map((tech, index) => (
                            
                                <div className="d-inline-block position-relative" key={tech.id}>
                                     <span style={styleIndex} className="position-absolute">{index+1}</span>
                                <Link
                                    to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${index+1}`} 
                                >
                                    <div className="dot ms-2">
                                        {tech.type !== null && (
                                            <>
                                                {tech.type.is_classic ===
                                                    true && (
                                                    <div className="mt-1">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faChalkboardUser
                                                            }
                                                            transform="down-6 grow-3"
                                                        />
                                                    </div>
                                                )}
                                                {tech.type.is_quiz === true && (
                                                    <div className="mt-1">
                                                        <FontAwesomeIcon
                                                            icon={faSquareCheck}
                                                            transform="down-6 grow-3"
                                                        />
                                                    </div>
                                                )}
                                                {tech.type.is_video ===
                                                    true && (
                                                    <div className="mt-1">
                                                        <FontAwesomeIcon
                                                            icon={faFilm}
                                                            transform="down-6 grow-3"
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {tech.type === null && (
                                            <div className="mt-1">
                                                <FontAwesomeIcon
                                                    icon={faGhost}
                                                    transform="down-6 grow-3"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                </div>
                            
                        ))}
                        {moduleData.length < 20 && (
                            <Link  onClick={addStage}>
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
                    <button
                                type="button"
                                className="btn btn-danger mt-3"
                                onClick={deleteStage}
                            >
                                Удалить {stage_id} этап
                            </button>
                </Col>
           
                {location.state === null && moduleData[stage_id-1] && moduleData[stage_id-1]["type"]===null && (
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
                )}

                {location.state === null ? (
                    <>
                        {/* <p>Вы еще не заполнили ваш урок. </p>
                        <div className="mb-2">
                            <Button
                                as={Link}
                                to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}/new`}
                                variant="outline-success"
                            >
                                добавить урок
                            </Button>
                        </div>
                         */}
                    </>
                ) : (
                    <>
                        {location.state.type === "classicLesson" ? (
                            <>
                                <AddingClassicLesson data={stagePkData} />
                            </>
                        ) : (
                            <>
                                {" "}
                                {location.state.type === "quizLesson" ? (
                                    <AddingQuizLesson data={stagePkData}/>
                                ) : (
                                    <>
                                        {" "}
                                        {location.state.type ===
                                        "videoLesson" ? (
                                            <AddingVideoLesson
                                            data={stagePkData}
                                            />
                                        ) : (
                                            <>
                                                {/* {" "}
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
                                                )} */}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                {moduleData[stage_id-1] && moduleData[stage_id-1]["type"]===null ? (
                    <></>
                ) : (
                    <>
                        {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_classic === true ? (
                            <EditClassicLesson
                                stage_id={stage_id}
                                contentData={moduleData[stage_id-1] && moduleData[stage_id-1]["type"]}
                            />
                        ) : (
                            <>
                                {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_quiz === true ? (
                                    <EditQuizLesson
                                        stage_id={stage_id}
                                        contentData={moduleData[stage_id-1] && moduleData[stage_id-1]["type"]}
                                    />
                                ) : (
                                    <>
                                        {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_video === true ? (
                                            <EditVideoLesson
                                                stage_id={stage_id}
                                                contentData={moduleData[stage_id-1] && moduleData[stage_id-1]["type"]}
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
       
        </>
    );
}
export default EditModuleStage;
