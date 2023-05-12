import Container from 'react-bootstrap/Container';
import React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <Container>
        <h3 className='mt-5'>
          Новые добавленые курсы <Link className='float-end' to={'/all-courses'}>Посмотреть все</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
          <Col>
            <Card style={{ width: '18rem' }}>
            <Link to={'detail/1'}><Card.Img variant="top" src="/images/code.jpg" /></Link>
              <Card.Body>
                <Card.Title><Link to={'detail/1'}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                <span>Рейтинг курса: 4.6 Сердечко иконка</span>
                <span>Просмотров курса:</span>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
        </Row >
        {/* popular courses */}
        <h3 className='mt-5'>
          Популярные курсы <Link className='float-end' to={'/popular-courses'}>Посмотреть популярные</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
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
        </Row>
        <h3 className='mt-5'>
          Популярные спикеры <Link className='float-end' to={''}>Посмотреть всех</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
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
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
        </Row >
      </Container>
    </>
  );
}

export default Home;
