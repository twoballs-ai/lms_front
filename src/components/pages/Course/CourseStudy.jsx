import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from 'sweetalert2'
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import './Course.css';

const baseUrl = 'http://127.0.0.1:8000/api/'
function CourseStudy() {
    // let { teacher_id } = useParams()

    // const [courseData, setCourseData]= useState([])
    // const [skillListData, setSkillListData]= useState([])
    // const [teacherData, setTeacherData]= useState([])
    // useEffect(()=>{
    //     axios
    //     .get(baseUrl+'teacher/'+teacher_id
    //       // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    //       // ,{headers: { "Content-Type": "multipart/form-data" }}
    //       )
    //     .then(response => {
    //       setCourseData(response.data.teacher_course)
    //       setTeacherData(response.data)
    //       setSkillListData(response.data.skill_list)
    //       console.log(response.data)
    //     })
    //   },[]) 
    return (
        <>
            <Container fluid className="g-0">
                <Row>
                    <Col xs={2}>
                        <div className="leftsidebar">
                            <p className="text-light">Название курса</p>
                            <h5 className="text-light">1 Введение</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <h5 className="text-light">2 Переменные</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <h5 className="text-light">3 Функции</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <h5 className="text-light">4 ООП</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <h5 className="text-light">5 Практика</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col>2 of 2</Col>
                </Row>


            </Container>

        </>
    )
}
export default CourseStudy