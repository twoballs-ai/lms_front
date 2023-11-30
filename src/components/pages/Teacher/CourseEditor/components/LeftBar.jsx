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
// import { apiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
import CourseEditorService from "../../../../../services/course.editor.service";

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
    console.log(module_id)
    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetCourse(course_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setCourseData(response.data);
                }
            });
            await CourseEditorService.editCoursePageGetChapter(course_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setChapterData(response.data);
                }
            });
        };
        fetchData();
    }, [navigate, location, course_id]);
    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetModuleStage(module_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setStepsData(response.data);
                }
            });
        };
        fetchData();
    }, [module_id]);
    return(
        <>

                        <div className="leftsidebar ps-2">
                            <p className="text-light">{courseData.title}</p>
                            <hr className="text-light me-2" />
                            {/* пофиксить: */}
                            {chapterData.map((tech) => {
                                return (
                                    <div key={tech.id}>
                                        <h5 className="text-light h6">
                                            {tech.title}
                                        </h5>
                                        {tech.chapter_modules.map(
                                            (modules, index) => {
                                                return (
                                                    <ul
                                                        className="nav flex-column"
                                                        key={modules.id}
                                                    >
                                                        <li className="nav-item">
                                                            <Link
                                                                className="nav-link text-light"
                                                                to={
                                                                    "/edit-course-full/edit-module/" +
                                                                    course_id +
                                                                    "/" +
                                                                    modules.id +
                                                                    "/stage/1"
                                                                }
                                                            >
                                                                {modules.title}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                );
                                            }
                                        )}
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
                                        >
                                            + модуль
                                        </Button>{" "}
                                    </div>
                                );
                            })}
                            <hr />
                            <Button
                                as={Link}
                                to={
                                    "/edit-course-full/add-chapter-full/" +
                                    course_id
                                }
                                variant="outline-success"
                            >
                                добавить новую главу
                            </Button>{" "}
                        </div>
        </>
    )

}

export default LeftBar