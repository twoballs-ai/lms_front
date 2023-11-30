import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiLmsUrl } from "../../../shared/config";
import SiteService from "../../../services/site.service";

function CategoryPage() {

    const [categoryData, setCategoryData] = useState([]);

    // const teacherId = localStorage.getItem('teacherId')
    // console.log(teacherId)
    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setCategoryData(response.data);
                }
            });
        };
        fetchData();
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
        <div className="mx-3">
                    <div className="shadow rounded p-3 mt-3 mb-5">
                <h3 className="mt-5">Все категории</h3>
                <Row className="mt-5">
                    <hr />
                    {categoryData &&
                        categoryData.map((row, index) => (
                            <Col>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link
                                                className="text-decoration-none text-info"
                                                to={`/courses-by-cat/${row.id}/${row.title}`}
                                            >
                                                Категория {row.title}. кол-во
                                                курсов: ({row.total_courses})
                                            </Link>
                                        </Card.Title>
                                        <Card.Text>{row.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                {/* {paginationBasic} */}
            </div>
        </div>
    );
}
export default CategoryPage;
