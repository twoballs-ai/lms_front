import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { apiUrl } from "../../../shared/config";
function Footer() {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {

    try {
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
    } catch (error) {
        console.log(error);
    }
 
}, []);

    return (
        <>
            <footer className="px-5 py-5 bg-secondary bg-opacity-10">
                <Row>
                    <Col>
                        {" "}
                        <span>
                            <h3>Intellity Code</h3>
                            <span>Telegram:</span>
                            <br />
                            <span>
                                
                                <a
                                    href="https://vk.com/intellity"

                                >vk</a>
                            </span>
                        </span>
                    </Col>
                    <Col><div>Категори курсов:</div>
                    {categoryData &&
                        categoryData.map((category, index) => (
                          <>
                          <p>{category.title}. кол-во курсов: {category.total_courses}</p>
                          </>
                        ))}
                    </Col>
                    <div className="border-top">
                        <p>intellity code, 2023</p>
                    </div>
                </Row>
            </footer>
        </>
    );
}

export default Footer;
