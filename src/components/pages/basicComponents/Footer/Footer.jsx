import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import axios from "axios";
// import { apiLmsUrl } from "../../../shared/config";
// import SiteService from "../../../services/site.service";
function Footer() {
//     const [categoryData, setCategoryData] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             await SiteService.getCategory().then((response) => {
//                 if (response.status === 200 || response.status === 201) {
//                     setCategoryData(response.data.data);
//                 }
//             });
//         };
//         fetchData();
//     }, []);

    return (
        <>
            <footer className="container__footer-container">
                <p>ddd</p>
                {/* <Row>
                    <Col>
                        {" "}
                        <span>
                            <h3>Intellity Code</h3>
                            <span>Telegram:</span>
                            <br />
                            <span>
                                <a href="https://vk.com/intellity">vk</a>
                            </span>
                        </span>
                    </Col>
                    <Col>
                        <div>Категории курсов:</div>
                        {categoryData &&
                            categoryData.map((category, index) => (
                                <p key={category.id}>
                                    {category.title}. кол-во курсов:{" "}
                                    {category.total_courses}
                                </p>
                            ))}
                    </Col>
                    <div className="border-top">
                        <p>intellity code, 2023</p>
                    </div>
                </Row> */}
            </footer>
        </>
    );
}

export default Footer;
