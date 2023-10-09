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
import { apiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from "react-router-dom";
function EditCourseFullData() {
    // let { teacher_id } = useParams()
    let { course_id } = useParams();
    let { module_id } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [stepsData, setStepsData] = useState([]);
    // const [moduleData, setModuleData]= useState([])
    // const [skillListData, setSkillListData]= useState([])
    // const [teacherData, setTeacherData]= useState([])
    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "module-stage/" + module_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    // console.log(response.data);
                    setStepsData(response.data);
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
                    console.log(response.data)
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


    const addToFavorite = () => {
        // try {
        //     axios
        //         .post(
        //             apiUrl + "add-favorite-courses/",
        //             {
        //                 student: studentId,
        //                 course: course_id,
        //                 is_favorite: true,
        //             },
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //             { headers: { "Content-Type": "multipart/form-data" } }
        //         )
        //         .then((response) => {
        //             if (response.status === 200 || response.status === 201) {
           
        //                 console.log(response.data);
        //                 // setShow(false)
        //                 // setEnrollStatus('success')
        //                 setFavoriteStatus("success");
        //             }
        //         });
        // } catch (error) {
        //     console.log(error);
        // }
    };
    // console.log(stepsData)
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <div>
                    <Navbar.Brand href="/">Intellity code</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div fluid className="g-0">
                <Row className="gx-0">
                    <Col xs={2}>
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
                                                        <li className="nav-item \">
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
                    </Col>
                    <Col className="mb-2">
                        <Outlet />
                        <div
                        style={{backgroundColor: "#DCDCDC"}}
                        className="w-100 position-fixed bottom-0"
                    >
                        {" "}
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary end-0"
                                onClick={addToFavorite}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                    </Col>

                </Row>
            </div>
        </>
    );
}
export default EditCourseFullData;
