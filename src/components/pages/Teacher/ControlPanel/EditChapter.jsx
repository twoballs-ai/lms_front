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

function EditChapter() {
    const {chapter_id} = useParams()
    const [chapterEditData, setChapterEditData] = useState({
      chapter: chapter_id,
      title:'',
      description:'',
      video:'',
      comment:''
    })
console.log(chapterEditData)
    useEffect(()=>{
        axios
        .get(baseUrl+'course-chapter/'+chapter_id
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
          )
        .then(response => {
            setChapterEditData(response.data)
            // setTotalResult(response.data.length)
          console.log(response.data)
        })
      },[]) 
      
    const handleChange=(event)=>{
        setChapterEditData({
          ...chapterEditData,
          [event.target.name]: event.target.value
        })
        console.log(chapterEditData)
      }

      const handleFileChange=(event)=>{
        setChapterEditData({
          ...chapterEditData,
          [event.target.name]:event.target.files[0]
        })
      }

      const formSubmit=(e)=>{
        e.preventDefault()
    
        axios
        .post(baseUrl+'chapter/', chapterEditData
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          ,{headers: { "Content-Type": "multipart/form-data" }}
          )
        .then(response => {
          console.log(response)
     
          // window.location.href='/teacher-profile/my-courses'
    
        })
      }
    return(
        <>
                <Card>
        <Card.Header>Редактирование главы</Card.Header>
       <Card.Body>
       <Form>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" type="text" placeholder="категория" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Описание</Form.Label>
        <Form.Control name="description"  value={chapterEditData.description}  as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Видео урок</Form.Label>
        <Form.Control name="video"   type="file" placeholder="Видео урок" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Комментарии автора</Form.Label>
        <Form.Control name="comment" as="textarea" rows={3} placeholder="Комментарии автора" onChange={handleChange} />
      </Form.Group>
    
      <Button onClick={formSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Card.Body>
    </Card>
        </>
    )
}
export default EditChapter