import React, { useState, useEffect } from "react";

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
            <div className="mt-5 gx-0">
                <hr />
                {popularCourseData &&
                    popularCourseData.map((course, index) => (
                        <div>
                            <div style={{ width: "18rem" }} className="shadow-sm">
                                <Link to={`/detail/${course.course.id}`}>
                                    <div.Img
                                        variant="top"
                                        src={
                                            course.course.course_image
                                                ? course.course.course_image
                                                : "/images/int.svg"
                                        }
                                    />
                                </Link>
                                <div>
                                    <div>
                                        <Link className="text-decoration-none text-info"
                                            to={`/detail/${course.course.id}`}
                                        >
                                            {course.course.title}
                                        </Link>
                                    </div>
                                </div>
                                <div.Footer>
                                    <span>Рейтинг курса: {course.rating}</span>
                                    <br />
                                    <span>
                                        Просмотров курса:{" "}
                                        {course.course.course_views}
                                    </span>
                                </div.Footer>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
}
export default HomePopularCourses;
