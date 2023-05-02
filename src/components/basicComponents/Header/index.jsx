import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
function Header() {
    return (
  <><Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Intellity code</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <Nav.Link to='/about'>Курсы</Nav.Link>
        <Nav.Link as={Link} to="/about">О нас</Nav.Link>
        <NavDropdown title="Пользователь" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/user-login">Авторизация</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-register">
              Регистрация
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/user-dashboard">
                Личный кабинет
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Выход
              </NavDropdown.Item>
            </NavDropdown>
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar></>
    );
  }
  
  export default Header;
  