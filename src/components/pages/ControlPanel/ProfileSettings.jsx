import { Link, Outlet } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table';
import MyCourses from "./MyCourses";
import SideBar from "./components/SideBar";
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
function ProfileSettings() {
  return (
    <>
        <Card >
      <Card.Header>Настройки профиля</Card.Header>
      <Card.Body>

      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
    </Form>
      </Card.Body>
    </Card>
 
    </>
  )

}

export default ProfileSettings