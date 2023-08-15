import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import ListGroup from 'react-bootstrap/ListGroup';

const baseUrl = 'http://127.0.0.1:8000/api/'
const typeUrl = 'http://127.0.0.1:8000/api-types/'


function AddStage() {

    let { module_id } = useParams()
    const [stageData, setStageData] = useState([])
    const addClassicLesson = () => {
        try {
            axios
            .post(baseUrl + 'module-stage/' + module_id, {
                title: '8',
              module: module_id,
              description: 'sdsdsd'
            }
              // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
              , { headers: { "Content-Type": "multipart/form-data" } }
            )
                .then(response => {
                    
                    if (response.status === 200 || response.status === 201) {
                        setStageData(response.data)
                        try {
                            axios
                              .post(typeUrl + 'classic-lesson/'+stageData.id, {
                                student: 'studentId',
                                course: 'course_id',
                                is_favorite: true
                              }
                                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                                , { headers: { "Content-Type": "multipart/form-data" } }
                              )
                              .then(response => {
                                if (response.status === 200 || response.status === 201) {
                                 
                                  console.log(response.data)
                                  // setShow(false)
                                  // setEnrollStatus('success')
                             
                                }
                              })
                          } catch (error) {
                            console.log(error)
                          }

                    }
                    // setModuleData(response.data)

                    // setTeacherData(response.data.teacher)
                    // setChapterData(response.data.course_chapters)
                    // setRelatedCourseData(JSON.parse(response.data.related_courses))
                    // setTechnologicalListData(response.data.technological_list)
                    // if (response.data.course_rating !== '' && response.data.course_rating !== null) {
                    //   setAvgRatingStatus(response.data.course_rating)
                    // }

                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    // const teacherId= localStorage.getItem('teacherId')

    //   useEffect(() => {

    //   }, [])

    // console.log(chapter_id)
    //   const handleChange=(event)=>{
    //     setChapterAddData({
    //       ...chapterAddData,
    //       [event.target.name]: event.target.value
    //     })
    //     console.log(chapterAddData)
    //   }

    //   const formSubmit=(e)=>{
    //     e.preventDefault()

    //     axios
    //     .post(baseUrl+'chapter-module/'+chapter_id, chapterAddData
    //       // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    //       ,{headers: { "Content-Type": "multipart/form-data" }}
    //       )
    //     .then(response => {
    //       if(response.status===200||response.status===201){
    //         Swal.fire({
    //           position: 'top-end',
    //           icon: 'success',
    //           title: 'Ваши данные обновлены',
    //           toast:true,
    //           timerProgressBar:true,
    //           showConfirmButton: false,
    //           timer: 30
    //         })
    //         window.location.reload()
    //       }

    //       // window.location.href='/teacher-profile/my-courses'

    //     })
    //   }
    console.log(stageData)
    return (
        <>
            <p>Добавление нового этапа</p>
            {/* <h3></h3> */}
            <Row>
                <Col>
               
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Body >
                            <Card.Title>Классический урок</Card.Title>
                            <Card.Text as={Link} to={`#`} onClick={addClassicLesson}>
                                Классический урок позволяет добавлять текст, картинки, ссылки, текст может быть сложно форматируемым.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Видео урок</Card.Title>
                            <Card.Text as={Link} to={`/`}>
                                В видео уроке вам доступны название урока, описание и ссылка на ваш видеоурок
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Квиз</Card.Title>
                            <Card.Text as={Link} to={`/`}>
                                Квиз позволит выбрать один ответ или несколько в зависимости от выбранного вами типа квиза.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Написание программы или ее части</Card.Title>
                            <Card.Text as={Link} to={`/`}>
                                Практический урок который позволит отточить ваши навыки программирования.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default AddStage