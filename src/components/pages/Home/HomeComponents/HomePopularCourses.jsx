import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
function HomePopularCourses(props) {
    let popularCourseData = props.popularCourseData;
    console.log(props);
    return (

        <div className="shadow rounded p-3 my-5">
            <h3 className="mt-5">
                Популярные курсы
                <Button
                    className="float-end"
                    as={Link}
                    to={"/popular-courses"}
                    variant="outline-info"
                >
                    Посмотреть популярные
                </Button>{" "}
            </h3>
            <Row className="mt-5 gx-0">
                <hr />
                {popularCourseData &&
                    popularCourseData.map((course, index) => (
                        <Col>
                            <Card style={{ width: "18rem" }} className="shadow-sm">
                                <Link to={`/detail/${course.course.id}`}>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            course.course.course_image
                                                ? course.course.course_image
                                                : "/images/int.svg"
                                        }
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        <Link className="text-decoration-none text-info"
                                            to={`/detail/${course.course.id}`}
                                        >
                                            {course.course.title}
                                        </Link>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <span>Рейтинг курса: {course.rating}</span>
                                    <br />
                                    <span>
                                        Просмотров курса:{" "}
                                        {course.course.course_views}
                                    </span>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
            </Row>
            </div>

    );
}
export default HomePopularCourses;
