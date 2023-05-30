import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const baseUrl = 'http://127.0.0.1:8000/api/'

function Coursechapter() {
    const [chapterData, setChapterData]= useState([])
    const [totalResult, setTotalResult]= useState(0)
    const {course_id} = useParams()
// console.log(teacherId)
  useEffect(()=>{
    axios
    .get(baseUrl+'course-chapter/'+course_id
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
        setChapterData(response.data)
        setTotalResult(response.data.length)
      console.log(response.data)
    })
  },[]) 
const Swal = require('sweetalert2')
  const handleDeleteClick = ()=>{
    Swal.fire({
      title: 'Подтвердите действие!',
      text: 'Вы собираетесь удалить главу, вы уверены?',
      icon: 'info',
      confirmButtonText: 'Все равно удалить',
      showCancelButton: true
      
    })
  }
    return(
<>
<Card>
        <Card.Header>Все главы курса ({totalResult})</Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>Название</th>
          <th>видео урок</th>
          <th>комментарии</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {chapterData.map((chapter,index)=>
        <tr key={index}>
          <td><Link to={"/teacher-profile/edit-chapter/"+chapter.id}variant="primary">{chapter.title}</Link>{' '}</td>
          <td>
          <video width="240" height="180" controls>
  <source src={chapter.video} type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video >
          </td>
          <td>{chapter.comment}</td>
          <td> 
          <Button as={Link} to={"/teacher-profile/edit-chapter/"+chapter.id}variant="primary"><FontAwesomeIcon icon={faPenToSquare} /></Button>{' '}
           <Button onClick={handleDeleteClick} variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>{' '}
          </td>
        </tr>
        )}
        
        
      </tbody>
    </Table>
      </Card.Body>
    </Card>

</>
    )

}
export default Coursechapter