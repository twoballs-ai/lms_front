import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom";
function NewAddedCourse(props) {
    let allCourseData = props.allCourseData
    console.log(props)
    return (
        <div className="shadow rounded p-3 mt-3 mb-5">
            <h3 className="mt-5 ">
                Новые добавленые курсы
                <Button
                    className="float-end"
                    as={Link}
                    to={"/all-courses"}
                    variant="outline-info"
                >
                    Посмотреть все
                </Button>{" "}
                {/* Новые добавленые курсы <Link className='float-end' to={'/all-courses'}>Посмотреть все</Link> */}
            </h3>
            <Row className="mt-5 gx-0">
                <hr />
                {allCourseData &&
                    allCourseData.map((course, index) => (
                        <Col>
                            <Card style={{ width: "18rem" }} className="shadow-sm">
                                <Link to={`/detail/${course.id}`}>
                                    <Card.Img
                                        variant="top"
                                        src={course.course_image ? course.course_image : "/images/int.svg"}
                                    // src="/images/int.svg"

                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        <Link className="text-decoration-none text-info" to={`/detail/${course.id}`}>
                                            {course.title}
                                        </Link>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <span>
                                        Рейтинг курса:{" "}
                                        {course.course_rating}
                                    </span>
                                    <br />
                                    <span>
                                        Просмотров курса:{" "}
                                        {course.course_views}
                                    </span>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    );
}
export default NewAddedCourse;
