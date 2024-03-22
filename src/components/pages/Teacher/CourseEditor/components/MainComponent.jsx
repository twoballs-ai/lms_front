import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import LeftBar from "./LeftBar";

function MainComponent() {
    return (
        <Container className="g-0" fluid>
            <Row className="g-0">
                <Col  xs={5} md={3}>
                    <LeftBar />
                </Col>
                <Col md={9}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}

export default MainComponent;
