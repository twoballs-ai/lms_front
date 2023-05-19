import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
function Header() {
  const teacherLoginStatus= localStorage.getItem('teacherLoginStatus')
    return (
  <><Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Intellity code</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <Nav.Link as={Link} to='/all-courses'>Курсы</Nav.Link>
        <Nav.Link as={Link} to="/about">О нас</Nav.Link>
        <NavDropdown title="Пользователь" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/student-login">Авторизация</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/student-register">
              Регистрация
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/student-profile">
                Личный кабинет
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Выход
              </NavDropdown.Item >
            </NavDropdown>
           
            <NavDropdown title="Наставник" id="navbarScrollingDropdown">
            {teacherLoginStatus!=='true'&&
            <>
              <NavDropdown.Item as={Link} to="/teacher-login">Авторизация</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/teacher-register">
              Регистрация
              </NavDropdown.Item>
              <NavDropdown.Divider />
              </>
            } 
              
              <NavDropdown.Item as={Link} to="/teacher-profile">
                Личный кабинет
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/teacher-logout">
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
  