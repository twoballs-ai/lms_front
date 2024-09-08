import React, { useState, useEffect } from "react"





import { Link } from "react-router-dom";
import axios from "axios";
import { apiLmsUrl } from "../../../shared/config";

function PopularCourses() {
    // let active = 2;
    let items = [];
    const [popularCourseData, setPopularCourseData] = useState([]);
    useEffect(() => {
        try {
            axios
                .get(
                    apiLmsUrl + "popular-courses/?popular=1"
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setPopularCourseData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    // for (let number = 1; number <= 5; number++) {
    //   items.push(
    //     <Pagination.Item key={number} active={number === active}>
    //       {number}
    //     </Pagination.Item>,
    //   );
    // }

    // const paginationBasic = (
    //     <div>
    //       <Pagination className='mt-5 justify-content-center'>{items}</Pagination>
    //     </div>
    //   );
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <h3 className="mt-5">Самые популярные курсы</h3>
                <div className="mt-5">
                    <hr />
                    {popularCourseData &&
                        popularCourseData.map((course, index) => (
                            <div>
                                <div style={{ width: "18rem" }}>
                                    <Link to={`/detail/${course.course.id}`}>
                                        <div.Img
                                            variant="top"
                                            src={course.course.course_image}
                                        />
                                    </Link>
                                    <div>
                                        <div>
                                            <Link
                                                className="text-decoration-none text-info"
                                                to={`/detail/${course.course.id}`}
                                            >
                                                {course.course.title}
                                            </Link>
                                        </div>
                                    </div>
                                    <div.Footer>
                                        <span>
                                            Рейтинг курса: {course.rating}
                                        </span>
                                        <span> Просмотров курса:</span>
                                    </div.Footer>
                                </div>
                            </div>
                        ))}
                </div>
                {/* {paginationBasic} */}
            </div>
        </div>
    );
}
export default PopularCourses;
