import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import Badge from "react-bootstrap/Badge";
import { apiUrl } from "../../../shared/config";

function TeacherDetail() {
    let { teacher_id } = useParams();

    const [courseData, setCourseData] = useState([]);
    const [skillListData, setSkillListData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    useEffect(() => {
        axios
            .get(
                apiUrl + "teacher/" + teacher_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setCourseData(response.data.teacher_course);
                setTeacherData(response.data);
                setSkillListData(response.data.skill_list);
                console.log(response.data);
            });
    }, []);
    return (
        <>
            <div>
                <Row className="mt-5">
                    <Col md={4}>
                        <Image variant="top" src="/images/code.jpg" thumbnail />
                    </Col>
                    <Col md={8}>
                        <h3>{teacherData.full_name}</h3>
                        <p>{teacherData.detail}</p>
                        <p>
                            Мои скиллы:&nbsp;
                            {skillListData.map((skill, index) => (
                                <Badge
                                    as={Link}
                                    to={`/courses-by-skills/${skill.trim()}/${
                                        teacherData.id
                                    }`}
                                    pill
                                    bg="success"
                                >
                                    {skill.trim()}
                                </Badge>
                            ))}
                        </p>
                        <p>
                            Последние добавленные курсы:{" "}
                            <Link to="#">React + Django курс</Link>
                        </p>
                        <p>Количество учащихся: 600 учеников</p>
                    </Col>
                </Row>
                <Card>
                    <Card.Header>Список курсов</Card.Header>
                    <ListGroup variant="flush">
                        {courseData.map((course, index) => (
                            <ListGroup.Item
                                as={Link}
                                to={`/detail/${course.id}`}
                            >
                                {course.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}
export default TeacherDetail;
