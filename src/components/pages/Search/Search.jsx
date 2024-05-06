import React, { useState, useEffect } from "react"





import { Link, useParams } from "react-router-dom";


import axios from "axios";
import { apiUrl } from "../../../shared/config";

function SearchByCourse() {
    const [allCourseData, setAllCourseData] = useState([]);
    const { searchString } = useParams();
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "search-by-course/" + searchString
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setAllCourseData(response.data.results);
                console.log(response.data);
            });
    }, []);

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
            <div>
                <h3 className="mt-5">
                    Поиск курса по названию{" "}
                    <span className="text-success">{searchString} </span>
                </h3>
                <div className="mt-5">
                    <hr />
                    {allCourseData &&
                        allCourseData.map((course, index) => (
                            <div>
                                <div style={{ width: "18rem" }}>
                                    <Link to={`/detail/${course.id}`}>
                                        <div.Img
                                            variant="top"
                                            src={course.course_image}
                                        />
                                    </Link>
                                    <div>
                                        <div>
                                            <Link to={`/detail/${course.id}`}>
                                                {course.title}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {paginationBasic}
            </div>
        </>
    );
}
export default SearchByCourse;
