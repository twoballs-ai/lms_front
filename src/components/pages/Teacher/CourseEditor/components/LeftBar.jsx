import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { apiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
import CourseEditorService from "../../../../../services/course.editor.service";
import { apiLmsUrl } from "../../../../../shared/config";
import "./style.css";

function LeftBar() {
    let { course_id } = useParams();
    let { module_id } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [stepsData, setStepsData] = useState([]);
    // const [moduleData, setModuleData]= useState([])
    // const [skillListData, setSkillListData]= useState([])
    // const [teacherData, setTeacherData]= useState([])
    console.log(module_id);
    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetCourse(course_id).then(
                (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setCourseData(response.data);
                    }
                }
            );
            await CourseEditorService.editCoursePageGetChapter(course_id).then(
                (response) => {
                    if (response.status === 200 || response.status === 201) {
                        setChapterData(response.data);
                    }
                }
            );
        };
        fetchData();
    }, [navigate, location, course_id]);
    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetModuleStage(
                course_id,
                module_id
            ).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setStepsData(response.data);
                }
            });
        };
        fetchData();
    }, [module_id]);

    const ModuleListMenu = ({ data }) => {
        return (
            <>
                {data.map((modules, index) => {
                    return (
                        <ul className="nav flex-column" key={modules.id}>
                            
                                <ModuleMenuItem item={modules} />

                                {/* {showButtonDelete && key === modules.id && (
                        <span>{index}</span>
                    )} */}
                          
                        </ul>
                    );
                })}
            </>
        );
    };

    const ModuleMenuItem = ({ item }) => {
        const [showButtonDelete, setShowButtonDelete] = useState(false);
        return (
            <>
            <div className=" "      
            onMouseEnter={() => setShowButtonDelete(true)}
                    onMouseLeave={() => setShowButtonDelete(false)}>
                <Link
               
                    className="nav-link text-light"
                    to={
                        "/edit-course-full/edit-module/" +
                        course_id +
                        "/" +
                        item.id +
                        "/stage/1"
                    }
                    key={item.id}
                >
                    {item.title}
                </Link>
                {showButtonDelete && (
                    <Link onClick={() => handleDeleteModule(item)}>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            transform="down-6 grow-3"
                            className="ms-3 icon"
                            onClick={() => handleDeleteModule(item)}
                        />
                    </Link>
                    
                )}
                  </div>
            </>
        );
    };

    const ChapterMenuItem = ({ data }) => {
        const [showButtonDelete, setShowButtonDelete] = useState(false);
        return (
            <>
                <h5
                    onMouseEnter={() => setShowButtonDelete(true)}
                    onMouseLeave={() => setShowButtonDelete(false)}
                    className="text-light h6"
                >
                    {data.title}{" "}
                    {showButtonDelete && (
                        <Button
                            className="ms-2"
                            onClick={() => handleDeleteChapter(data)}
                            variant="danger"
                            size="sm"
                        >
                            Удалить главу
                        </Button>
                    )}
                </h5>
            </>
        );
    };

    const handleDeleteModule = async (data) => {
        console.log("del");
        console.log(data);
        await CourseEditorService.editCoursePageDeleteModule(
            data.chapter,
            data.id
        ).then((response) => {
            if (response.status === 204) {
                window.location.reload();
            }
        });
    };
    const handleDeleteChapter = async (data) => {
        console.log("del");
        console.log(data);
        await CourseEditorService.editCoursePageDeleteChapter(data.id).then(
            (response) => {
                if (response.status === 204) {
                    navigate(`/edit-course-full/editor-info/${course_id}`);
                }
            }
        );
    };
    return (
        <>
            <div className="">
                <p className="">{courseData.title}</p>
                <hr className="" />
                {/* пофиксить: */}
                {chapterData.map((tech) => {
                    return (
                        <div key={tech.id}>
                            <ChapterMenuItem data={tech} />
                            <ModuleListMenu data={tech.chapter_modules} />
                            <Button
                                className="ms-5"
                                as={Link}
                                to={
                                    "/edit-course-full/add-module/" +
                                    course_id +
                                    "/" +
                                    tech.id
                                }
                                variant="success"
                                size="sm"
                            >
                                + модуль
                            </Button>{" "}
                        </div>
                    );
                })}
                <hr />
                <Button
                    as={Link}
                    to={"/edit-course-full/add-chapter-full/" + course_id}
                    variant="outline-success"
                >
                    добавить новую главу
                </Button>{" "}
            </div>
        </>
    );
}

export default LeftBar;
