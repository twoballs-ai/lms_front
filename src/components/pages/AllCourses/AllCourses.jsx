import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiLmsUrl } from "../../../shared/config";
import SiteService from "../../../services/site.service";

function AllCourses() {
    const [allCourseData, setAllCourseData] = useState([]);
    const teacherId = localStorage.getItem("teacherId");
    const [pageCount, setPageCount] = useState(0);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    // console.log(teacherId)
    useEffect(() => {
        fetchData(apiLmsUrl + "course/");
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

    async function fetchData(url) {
        await SiteService.allCoursesPage(url).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setAllCourseData(response.data.results);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
            }
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
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
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
                                            <Link
                                                className="text-decoration-none text-info"
                                                to={`/detail/${course.id}`}
                                            >
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
        </div>
    );
}
export default AllCourses;
