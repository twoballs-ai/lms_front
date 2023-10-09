import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiUrl } from "../../../shared/config";

function AllCourses() {
    const [allCourseData, setAllCourseData] = useState([]);
    const teacherId = localStorage.getItem("teacherId");
    const [pageCount, setPageCount] = useState(0);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    // console.log(teacherId)
    useEffect(() => {
        fetchData(apiUrl + "course/");
    }, []);

    let active = 1;
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
                setAllCourseData(response.data.results);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
                console.log(response.data);
            });
    }
    const paginationBasic = (
        <div className="mt-5">
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
        <>
            <div>
                <h3 className="mt-5">Все курсы</h3>
                <Row className="mt-5">
                    <hr />
                    {allCourseData &&
                        allCourseData.map((course, index) => (
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
            </div>
        </>
    );
}
export default AllCourses;
