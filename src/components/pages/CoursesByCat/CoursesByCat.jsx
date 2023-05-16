import Container from 'react-bootstrap/Container';
import React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

function CoursesByCat(){
    let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
    <div>
      <Pagination className='mt-5 justify-content-center'>{items}</Pagination>
    </div>
  );
    return (
        <>
         <Container>
        <h3 className='mt-5'>
          Курсы по категориям
        </h3>
        <Row className='mt-5'>

          <hr />
          <Col>
            <Card style={{ width: '18rem' }}>
            <Link to={'detail/1'}><Card.Img variant="top" src="/images/code.jpg" /></Link>
              <Card.Body>
                <Card.Title><Link to={'detail/1'}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
        </Row >
        {paginationBasic}
        </Container>
        </>
    )
}
export default CoursesByCat