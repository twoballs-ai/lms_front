import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { redirect } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Table from "react-bootstrap/Table";
// import Figure from "react-bootstrap/Figure";
// import axios from "axios";
// import "./style.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faGhost } from "@fortawesome/free-solid-svg-icons";
// import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
// import { faFilm } from "@fortawesome/free-solid-svg-icons";
// import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
// import { apiLmsUrl, apiUrl, typesApiUrl } from "../../../../../shared/config";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
// import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
// import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
// import AddingCodeLesson from "./TypeLessonForm/CodeLesson";
// import EditClassicLesson from "./TypeLessonForm/Edit/ClassicLessonEdit";
// import EditQuizLesson from "./TypeLessonForm/Edit/QuizLessonEdit";
// import EditVideoLesson from "./TypeLessonForm/Edit/VideoLessonEdit";
// import CourseEditorService from "../../../../../services/course.editor.service";
function EditModuleStage() {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    const [moduleData, setModuleData] = useState([]);
    // const [stagePkData, setStagePkData] = useState("");
    // const [typeStageData, setTypeStageData] = useState(null);
    // const location = useLocation();
    // const navigate = useNavigate();
    // const styleIndex = {
    //     left: "26px",
    //     top: "-20px",
    // };
    // // const {state} = useLocation();
    // // const { type } = state;
    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetModuleStage(
                course_id,
                module_id
            ).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setModuleData(response.data);
                    // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                    setStagePkData(
                        response.data[parseInt(stage_id) - 1] &&
                            response.data[parseInt(stage_id) - 1]["id"]
                    );
                }
            });
        };
        fetchData();
    }, [module_id, stage_id, navigate, location]);
    // const addStage = async () => {
    //     const data = {
    //         module: module_id,
    //         course: course_id,
    //     };
    //     await CourseEditorService.editCoursePageAddModuleStage(
    //         course_id,
    //         module_id,
    //         data
    //     ).then((response) => {
    //         if (response.status === 200 || response.status === 201) {
    //             navigate(
    //                 `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${
    //                     parseInt(stage_id) + 1
    //                 }`
    //             );
    //         }
    //     });
    // };
    // const handleDeleteStage = async () => {
    //     await CourseEditorService.editCoursePageDeleteModuleStage(
    //         course_id,
    //         module_id,
    //         stagePkData
    //     ).then((response) => {
    //         if (response.status === 204) {
    //             navigate(
    //                 `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${parseInt(
    //                     stage_id
    //                 )}`
    //             );
    //         }
    //     });
    // };

    // // const handleDeleteModule = () => {
    // //     console.log("del")
    // //     try {
    // //         axios.delete(apiLmsUrl + "chapter-module-detail/" + chapter_id+"/"+module_id).then((response) => {
    // //             if (response.status === 204) {
    // //                 console.log("success")
    // //                 // window.location.reload();
    // //             }
    // //         });
    // //     } catch (error) {console.log(error)}
    // // };

    // // console.log(moduleData[stage_id - 1] && moduleData[stage_id - 1]["type"]);
    // // console.log(moduleData);
    // // console.log(stagePkData);
    // // console.log(stage_id);

    return (
        <>
  <p className="s">Вы перешли на страницу редактирования модуля  </p>{" "}
            
            <div>
                <div className="ms-3">
                    {moduleData.map((tech, index) => (
                        <div
                            className="d-inline-block position-relative"
                            key={tech.id}
                        >
                            <span
                                style={styleIndex}
                                className="position-absolute"
                            >
                                {index + 1}
                            </span>
                            <Link
                                to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${
                                    index + 1
                                }`}
                            >
                                <div className="dot ms-2">
                                    {tech.type !== "не назначен" && (
                                        <>
                                            {tech.type.is_classic === true && (
                                                <div className="mt-1">
                                                    <FontAwesomeIcon
                                                        icon={faChalkboardUser}
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
                                            {tech.type.is_video === true && (
                                                <div className="mt-1">
                                                    <FontAwesomeIcon
                                                        icon={faFilm}
                                                        transform="down-6 grow-3"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {tech.type === "не назначен" && (
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
                    {/* {moduleData.length < 20 && (
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
                    )} */}
                </div>
                {/* {stage_id === 1 && (
                    <button
                        type="button"
                        className="btn btn-danger mt-3"
                        onClick={handleDeleteStage}
                    >
                        Удалить {stage_id} этап
                    </button>
                )} */}
            </div>

 

        </>
    );
}
export default EditModuleStage;
