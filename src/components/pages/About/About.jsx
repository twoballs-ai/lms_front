import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function About() {
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <div className="px-5 py-5">
                    <Card>
                        <Card.Header as="h5">Немного о компании</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Intellity code - сайт для изучения
                                программирования.
                            </Card.Title>
                            <Card.Text>
                                Сюда мы напишем что ни будь, но потом.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default About;
