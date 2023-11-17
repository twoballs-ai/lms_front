import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalRegisterLogin from "../../TabsLoginRegister/HeaderComponents/ModalRegistrationLogin";

function Header() {
    const [searchData, setSearchData] = useState({
        search: "",
    });
    const is_teacher = localStorage.getItem("is_teacher");
    const is_student = localStorage.getItem("is_student");
    const handleChange = (event) => {
        setSearchData({
            ...searchData,
            [event.target.name]: event.target.value,
        });
        console.log(searchData);
    };

    const searchByCourse = () => {
        if (searchData.search !== "")
            window.location.href = "/search/" + searchData.search;
    };

    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
      if (localStorage.getItem('access_token') !== null) {
         setIsAuth(true); 
       }
     }, [isAuth]);


    return (
        <>
            <Navbar
                bg="light"
                data-bs-theme="light"
                expand="lg"
                className="shadow"
            >
                <Navbar.Brand className="ms-3" href="/">
                    Intellity code
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="me-3" id="basic-navbar-nav">
                    <Form className="d-flex me-4">
                        <Form.Control
                            type="search"
                            name="search"
                            onChange={handleChange}
                            placeholder="Поиск курсов по названию"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button
                            onClick={searchByCourse}
                            variant="outline-secondary"
                        >
                            Поиск
                        </Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/category">
                            Категории
                        </Nav.Link>
                        <Nav.Link as={Link} to="/all-courses">
                            Курсы
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            О нас
                        </Nav.Link>
                   
                        {isAuth ?  <NavDropdown
                        align="end"
                            title="Профиль"
                            id="navbarScrollingDropdown"
                            className="mb-2"
                        >
                            {is_teacher === "true" && (
                                <>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/teacher-profile"
                                    >
                                        Личный кабинет учителя
                                    </NavDropdown.Item>

                          
                                </>
                            )}
                            {is_student === "true" && (
                                <>
                                    <NavDropdown.Item
                                        as={Link}
                                        to="/student-profile"
                                    >
                                        Личный кабинет ученика
                                    </NavDropdown.Item>
                       
                                </>
                            )}
                                      <NavDropdown.Item
                                        as={Link}
                                        to="/logout"
                                    >
                                        Выход
                                    </NavDropdown.Item>
                        </NavDropdown> :  
                    <ModalRegisterLogin />}
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
