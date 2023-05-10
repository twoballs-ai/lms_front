import { Link, Outlet } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Row, Col } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'
import MyCourses from "../MyCourses"
import SideBar from "./SideBar"

function DashMain() {
  return (
    <>
      <Container>
        <Row>

          <aside className="col-md-3">
            <SideBar />
          </aside>

          <section className="col-md-8">
            <Outlet />
          </section>

        </Row>
      </Container>
    </>
  )

}

export default DashMain