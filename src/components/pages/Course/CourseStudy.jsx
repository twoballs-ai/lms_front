import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import "./Course.css";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { apiUrl } from "../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
function CourseStudy() {
    // let { teacher_id } = useParams()
    let { course_id } = useParams();
    let { module_id } = useParams();
    let { stage_id } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    // const [stepsData, setStepsData] = useState([]);
    const [stagePassData, setStagePassData] = useState("");
    const studentId = localStorage.getItem("studentId");
    const [moduleData, setModuleData] = useState([]);
    const [stagePkData, setStagePkData] = useState("");
    // const [skillListData, setSkillListData]= useState([])
    // const [teacherData, setTeacherData]= useState([])
    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl +
                        `student-module-stage-list/${module_id}/${studentId}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    console.log(response.data);
                    setModuleData(response.data);
                    setStagePassData(
                        response.data[parseInt(stage_id) - 1] &&
                            response.data[parseInt(stage_id) - 1][
                                "pass_items"
                            ][0].id
                    );
                    // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                    // setStagePkData(
                    //     response.data[parseInt(stage_id) - 1] &&
                    //         response.data[parseInt(stage_id) - 1]["id"]
                    // );
                    // setTypeStageData()
                    // setStagePk(response.data.id);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl + "course/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    console.log(response.data);
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(apiUrl + "course-chapter/" + course_id)
                .then((response) => {
                    console.log(response);
                    // setCourseData(response.data)
                    setChapterData(response.data);
                });
        } catch (error) {}
    }, [navigate, location, course_id, module_id]);

    const setPass = () => {
        try {
            axios
                .patch(
                    apiUrl + "student-stage-pass/" + stagePassData,
                    {
                        is_passed: "true",
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data);
                        // window.location.reload();
                        navigate(
                            `/course-study/course/${course_id}/${module_id}/stage/${
                                parseInt(stage_id) + 1
                            }`
                        );
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(stage_id);
    return (
        <>
            <Container fluid className="p-0 bg-light">
            <Navbar bg="info" data-bs-theme="dark" expand="lg" className="shadow">
                <Navbar.Brand className="ms-3" href="/">
                    Intellity code
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/category">
                            Категории
                        </Nav.Link>
                        <Nav.Link as={Link} to="/all-courses">
                            Курсы
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            О нас
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse> */}
            </Navbar>
                <div fluid className="g-0">
                    <Row className="gx-0">
                        <Col xs={2} className="sticky-top overflow-y-auto">
                            <div className="sticky-top leftsidebar ps-2">
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
                                                            <li className="nav-item \">
                                                                <Link
                                                                    className="nav-link text-light"
                                                                    to={`/course-study/course/${course_id}/${modules.id}/stage/1`}
                                                                >
                                                                    {
                                                                        modules.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                })}
                                <hr />
                            </div>
                        </Col>
                        <Col className="mb-2 sticky-top overflow-y-auto">
                            <Outlet context={[moduleData, setModuleData]} />
                            <div
                                style={{ backgroundColor: "#DCDCDC" }}
                                className="w-100 h-25 position-sticky mt-3"
                            >
                                {" "}
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-2 float-end"
                                        onClick={setPass}
                                    >
                                        Продолжить
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}
export default CourseStudy;
