import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiUrl } from "../../../shared/config";

function SkillCourses() {
    const [courseByCatData, setCourseByCatData] = useState([]);
    let { skill_slug, teacher_id } = useParams();

    // const teacherId = localStorage.getItem('teacherId')
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl +
                    "course/?skill_slug=" +
                    skill_slug +
                    "&teacher=" +
                    teacher_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setCourseByCatData(response.data.results);
                console.log(response.data);
            });
    }, [skill_slug]);

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    const paginationBasic = (
        <div>
            <Pagination className="mt-5 justify-content-center">
                {items}
            </Pagination>
        </div>
    );
    return (
        <>
            <Container>
                <h3 className="mt-5">Курсы по категории: {skill_slug}</h3>
                <Row className="mt-5">
                    <hr />
                    {courseByCatData &&
                        courseByCatData.map((course, index) => (
                            <Col>
                                <Card style={{ width: "18rem" }}>
                                    <Link to={`/detail/${course.id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={course.course_image}
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to={`/detail/${course.id}`}>
                                                {course.title}
                                            </Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                {paginationBasic}
            </Container>
        </>
    );
}
export default SkillCourses;
