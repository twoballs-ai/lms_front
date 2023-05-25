import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'

function Coursechapter() {
    const [chapterData, setChapterData]= useState([])
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
      console.log(response.data)
    })
  },[]) 
    return(
<>
<Card>
        <Card.Header>Все главы курса</Card.Header>
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
          <td>{chapter.title}</td>
          <td>
          <video width="240" height="180" controls>
  <source src={chapter.video} type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video >
          </td>
          <td>{chapter.comment}</td>
          <td> 
            <Button variant="danger">Удалить главу</Button>{' '}
            <Button variant="primary">редактировать главу</Button>{' '}
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