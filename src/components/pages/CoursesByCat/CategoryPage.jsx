import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiUrl } from "../../../shared/config";

function CategoryPage() {
    const [categoryData, setCategoryData] = useState([]);

    // const teacherId = localStorage.getItem('teacherId')
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "category/"
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setCategoryData(response.data);
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
            <Container>
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
                                                to={`/courses-by-cat/${row.id}/${row.title}`}
                                            >
                                                {row.title} ({row.total_courses}
                                                )
                                            </Link>
                                        </Card.Title>
                                        <Card.Text>{row.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                {paginationBasic}
            </Container>
        </>
    );
}
export default CategoryPage;
