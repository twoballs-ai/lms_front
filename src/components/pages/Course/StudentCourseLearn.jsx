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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { apiUrl, typesApiUrl } from "../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
import ClassicLessonView from "./TypelessonViews/ClassicLessonView";
import QuizLessonView from "./TypelessonViews/QuizLessonView";
import VideoLessonView from "./TypelessonViews/VideoLessonView";
import "./Course.css";
// import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
// import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
// import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
// import AddingCodeLesson from "./TypeLessonForm/CodeLesson";
// import EditClassicLesson from "./TypeLessonForm/Edit/ClassicLessonEdit";
// import EditQuizLesson from "./TypeLessonForm/Edit/QuizLessonEdit";
// import EditVideoLesson from "./TypeLessonForm/Edit/VideoLessonEdit";
function StudentCourseLearn() {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    const [moduleData, setModuleData] = useState([]);
    const [stagePkData, setStagePkData] = useState("");
    const [stagePassData, setStagePassData] = useState("");
    const [typeStageData, setTypeStageData] = useState(null);
    const studentId = localStorage.getItem("studentId");
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
                    apiUrl + `student-module-stage-list/${module_id}/${studentId}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    console.log(response.data[parseInt(stage_id)-1] && response.data[parseInt(stage_id)-1]["pass_items"][0]);
                    setModuleData(response.data);
                    setStagePassData(response.data[parseInt(stage_id)-1] && response.data[parseInt(stage_id)-1]["pass_items"][0])
                    // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                    setStagePkData(response.data[parseInt(stage_id)-1] && response.data[parseInt(stage_id)-1]["id"])
                    // setTypeStageData()
                    // setStagePk(response.data.id);
                });
        } catch (error) {
            console.log(error);
        }
    }, [module_id,stage_id, navigate, location]);



    console.log(moduleData[stage_id-1] && moduleData[stage_id-1]["type"]);

  const Dots = () =>{

    return(
        <div className="ms-3 mt-3">
                        {moduleData.map((tech, index) => (
                            
                                <div className="d-inline-block position-relative" key={tech.id}>
                                <Link
                                
                                    to={
                                        `/course-study/course/${course_id}/${module_id}/stage/${index+1}`} 
                                >
                                    
                                    {tech.type !== "не назначен" && (
                                     
                                    <div className={`dotUser ms-2`}>
                                           
                                         
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
                                         
                                     
                                    </div>
                                       )}
                                </Link>
                                </div>
                            
                        ))}
                    </div>
    )
  }
    return (
        <>
      
                <Col>
                    <div className="ms-3 mt-3">
                        {moduleData.map((tech, index) => (
                            
                                <div className="d-inline-block position-relative" key={tech.id}>
                                <Link
                                
                                    to={
                                        `/course-study/course/${course_id}/${module_id}/stage/${index+1}`} 
                                >
                                    
                                    {tech.type !== "не назначен" && (
                                     
                                    <div className={`dotUser ms-2`}>
                                           
                                         
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
                                         
                                     
                                    </div>
                                       )}
                                </Link>
                                </div>
                            
                        ))}
                    </div>
                </Col>
     
       
                {moduleData[stage_id-1] && moduleData[stage_id-1]["type"]===null ? (
                    <></>
                ) : (
                    <>
                        {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_classic === true ? (
                            <ClassicLessonView
                                stage_id={stage_id}
                                contentData={moduleData[stage_id-1] && moduleData[stage_id-1]["type"]}
                            />
                        ) : (
                            <>
                                {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_quiz === true ? (
                                    <QuizLessonView
                                        stage_id={stage_id}
                                        contentData={moduleData[stage_id-1] && moduleData[stage_id-1]["type"]}
                                    />
                                ) : (
                                    <>
                                        {moduleData[stage_id-1] && moduleData[stage_id-1]["type"].is_video === true ? (
                                            <VideoLessonView
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
export default StudentCourseLearn;
