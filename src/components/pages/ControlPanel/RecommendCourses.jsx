import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
function RecommendCourses() {
    return(
        <>
        <Card>
        <Card.Header>Htrjvtyljdfyyst rehcs</Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>Название курса</th>
          <th>Создатель</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Python</td>
          <td><Link to='/'>Борис Богатырев</Link> </td>
          <td> <Button variant="danger">Удалить</Button>{' '}</td>
        </tr>
        
      </tbody>
    </Table>
      </Card.Body>
    </Card>
        </>
    )
}
export default RecommendCourses