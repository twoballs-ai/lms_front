import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import "./Course.css";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { apiUrl } from "../../../shared/config";

function CourseStudy() {
    // let { teacher_id } = useParams()
    let { course_id } = useParams();
    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    // const [moduleData, setModuleData]= useState([])
    // const [skillListData, setSkillListData]= useState([])
    // const [teacherData, setTeacherData]= useState([])
    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "course/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setCourseData(response.data);

                    // setTeacherData(response.data.teacher)
                    // setChapterData(response.data.course_chapters)
                    // setRelatedCourseData(JSON.parse(response.data.related_courses))
                    // setTechnologicalListData(response.data.technological_list)
                    // if (response.data.course_rating !== '' && response.data.course_rating !== null) {
                    //   setAvgRatingStatus(response.data.course_rating)
                    // }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl + "course-chapter/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    // setCourseData(response.data)
                    setChapterData(response.data);

                    // setTeacherData(response.data.teacher)
                    // setChapterData(response.data.course_chapters)
                    // setRelatedCourseData(JSON.parse(response.data.related_courses))
                    // setTechnologicalListData(response.data.technological_list)
                    // if (response.data.course_rating !== '' && response.data.course_rating !== null) {
                    //   setAvgRatingStatus(response.data.course_rating)
                    // }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    //   console.log(moduleData)
    //   console.log(chapterData)
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
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
                </Container>
            </Navbar>
            <Container fluid className="g-0">
                <Row>
                    <Col xs={2}>
                        <div className="leftsidebar ps-2">
                            <p className="text-light">{courseData.title}</p>
                            <hr className="text-light me-2" />
                            {/* пофиксить: */}
                            {chapterData.map((tech, index) => (
                                <>
                                    <h5 className="text-light h6">
                                        {tech.title}
                                    </h5>

                                    {tech.chapter_modules.map(
                                        (modules, index) => (
                                            <ul class="nav flex-column">
                                                <li class="nav-item ">
                                                    <a
                                                        className="nav-link text-light"
                                                        href="#"
                                                    >
                                                        {modules.title}
                                                    </a>
                                                </li>
                                            </ul>
                                        )
                                    )}
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <h3>1 Введение</h3>
                        <hr />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default CourseStudy;
