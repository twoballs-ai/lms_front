import React, { useState, useEffect } from "react"

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
            <div className="mt-5 gx-0">
                <hr />
                {popularTeacherData &&
                    popularTeacherData.map((teacher, index) => (
                        <div>
                            <div style={{ width: "18rem" }} className="shadow-sm">
                                <Link to={`teacher-detail/${teacher.id}`}>
                                    <div.Img
                                        variant="top"
                                        src={teacher.teacher_image ? teacher.teacher_image : "/images/int.svg"}
                                    />
                                </Link>
                                <div>
                                    <div>
                                        <Link className="text-decoration-none text-info"
                                            to={`teacher-detail/${teacher.id}`}
                                        >
                                            {teacher.full_name}
                                        </Link>
                                    </div>
                                </div>
                                <div.Footer>
                                    Курсов добавлено:{" "}
                                    {teacher.total_teacher_courses}
                                </div.Footer>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
export default HomeTeacherPopular;
