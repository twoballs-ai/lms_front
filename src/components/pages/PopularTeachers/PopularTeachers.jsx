import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { apiUrl } from "../../../shared/config";

function PopularTeachers() {
    const [popularTeacher, setPopularTeacher] = useState(null);
    useEffect(() => {
        axios.get(apiUrl + "/teacher/").then((res) => {
            setPopularTeacher(res.data);
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
                <h3 className="mt-5">Рейтинг популярных преподавателей</h3>
                <Row className="mt-5">
                    <hr />
                    <Col>
                        <Card style={{ width: "18rem" }}>
                            <Link to={"detail/1"}>
                                <Card.Img
                                    variant="top"
                                    src="/images/code.jpg"
                                />
                            </Link>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="/images/code.jpg" />
                            <Card.Body>
                                <Card.Title>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="/images/code.jpg" />
                            <Card.Body>
                                <Card.Title>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src="/images/code.jpg" />
                            <Card.Body>
                                <Card.Title>
                                    <Link to={"/teacher-detail/1"}>
                                        Имя учителя
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                Рейтинг наставника: 4.6 Сердечко
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                {paginationBasic}
            </Container>
        </>
    );
}
export default PopularTeachers;
