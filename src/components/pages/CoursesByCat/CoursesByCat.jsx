import React, { useState, useEffect } from "react";





import { Link, useParams } from "react-router-dom";


import axios from "axios";
import { apiUrl } from "../../../shared/config";

function CoursesByCat() {
    const [courseByCatData, setCourseByCatData] = useState([]);
    let { category_id } = useParams();
    let { category_slug } = useParams();
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();

    // const teacherId = localStorage.getItem('teacherId')
    // console.log(teacherId)
    useEffect(() => {
        fetchData(apiUrl + "course/?category=" + category_id);
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

    const paginationHandler = (url) => {
        fetchData(url);
    };
    function fetchData(url) {
        axios
            .get(
                url
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                console.log(response.data)
                setCourseByCatData(response.data.results);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
                console.log(response.data);
            });
    }
    const paginationBasic = (
        <div className="mt-5 d-flex justify-content-center">
            <Pagination>
                {prevUrl && (
                    <Pagination.Prev onClick={() => paginationHandler(prevUrl)}>
                        Пред
                    </Pagination.Prev>
                )}
                {nextUrl && (
                    <Pagination.Next onClick={() => paginationHandler(nextUrl)}>
                        След
                    </Pagination.Next>
                )}
            </Pagination>
        </div>
    );
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <h3 className="mt-5">Курсы по категории: {category_slug}</h3>
                <div className="mt-5">
                    <hr />
                    {courseByCatData &&
                        courseByCatData.map((course, index) => (
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
                                            <Link className="text-decoration-none text-info" to={`/detail/${course.id}`}>
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
        </div>
    );
}
export default CoursesByCat;
