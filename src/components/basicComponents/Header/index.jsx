import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
function Header() {
  const [searchData, setSearchData] = useState({
    search: ''
  })
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  const handleChange = (event) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })
    console.log(searchData)
  }

  const searchByCourse = () => {
    if (searchData.search !== '') (
      window.location.href = '/search/' + searchData.search
    )

  }
  return (
    <><Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Intellity code</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to='/category'>Категории</Nav.Link>
            <Nav.Link as={Link} to='/all-courses'>Курсы</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>
            <NavDropdown title="Пользователь" id="navbarScrollingDropdown">
              {studentLoginStatus !== 'true' &&
                <>
                  <NavDropdown.Item as={Link} to="/student-login">Авторизация</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student-register">
                    Регистрация
                  </NavDropdown.Item>
                </>
              }
              {studentLoginStatus === 'true' &&
                <>
                  <NavDropdown.Item as={Link} to="/student-profile">
                    Личный кабинет
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student-logout">
                    Выход
                  </NavDropdown.Item >
                </>
              }
            </NavDropdown>

            <NavDropdown title="Наставник" id="navbarScrollingDropdown">
              {teacherLoginStatus !== 'true' &&
                <>
                  <NavDropdown.Item as={Link} to="/teacher-login">Авторизация</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/teacher-register">
                    Регистрация
                  </NavDropdown.Item>
                </>
              }
              {teacherLoginStatus === 'true' &&
                <>
                  <NavDropdown.Item as={Link} to="/teacher-profile">
                    Личный кабинет
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/teacher-logout">
                    Выход
                  </NavDropdown.Item>
                </>
              }
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              name='search'
              onChange={handleChange}
              placeholder="Поиск курсов по названию"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={searchByCourse} variant="outline-secondary">Поиск</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar></>
  );
}

export default Header;
