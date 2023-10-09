import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
function HomeTeacherPopular(props) {
let popularTeacherData = props.popularTeacherData
console.log(props)
    return (
        <div className="shadow rounded p-3 my-5">
                <h3 className="mt-5">
                    Популярные наставники
                    <Button
                        className="float-end"
                        as={Link}
                        to={"/popular-teachers"}
                        variant="outline-info"
                    >
                        Посмотреть всех
                    </Button>{" "}
                    {/* Популярные наставники <Link className='float-end' to={'/popular-teachers'}>Посмотреть всех</Link> */}
                </h3>
                <Row className="mt-5 gx-0">
                    <hr />
                    {popularTeacherData &&
                        popularTeacherData.map((teacher, index) => (
                            <Col>
                                <Card style={{ width: "18rem" }}className="shadow-sm">
                                    <Link to={`teacher-detail/${teacher.id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={teacher.teacher_image ? teacher.teacher_image : "/images/int.svg"}
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>
                                        <Link className="text-decoration-none text-info"
                                                to={`teacher-detail/${teacher.id}`}
                                            >
                                                {teacher.full_name}
                                            </Link>
                                        </Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        Курсов добавлено:{" "}
                                        {teacher.total_teacher_courses}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                </Row>
                </div>
    );
}
export default HomeTeacherPopular;
