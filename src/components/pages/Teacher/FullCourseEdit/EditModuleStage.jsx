import { Link, useParams } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import Figure from 'react-bootstrap/Figure';
import axios from "axios";
import Swal from 'sweetalert2'
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const baseUrl = 'http://127.0.0.1:8000/api/'


function EditModuleStage() {

    let { module_id } = useParams()
    let { course_id } = useParams()
    const [moduleData, setModuleData] = useState([])
    useEffect(() => {
        try {
            axios
                .get(baseUrl + 'module-stage/' + module_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then(response => {
                    setModuleData(response.data)

                    // setTeacherData(response.data.teacher)
                    // setChapterData(response.data.course_chapters)
                    // setRelatedCourseData(JSON.parse(response.data.related_courses))
                    // setTechnologicalListData(response.data.technological_list)
                    // if (response.data.course_rating !== '' && response.data.course_rating !== null) {
                    //   setAvgRatingStatus(response.data.course_rating)
                    // }

                    console.log(response.data)
                })
        } catch (error) {
            console.log(error)
        }

    }, [module_id])
 
    return (
        <>

            <Row><p>Вы перешли на страницу редактирования модуля</p>
                <Col>
                    <div className="ms-3">
                        {moduleData.map((tech, index) =>
                            <Link to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${tech.id}`}>
                                <div className="dot ms-3" >
                                    {tech.type !== null &&
                                        <>
                                            {tech.type.is_classic === true &&
                                                <p>classic</p>
                                            }
                                            {tech.type.is_quiz === true &&
                                                <p>quiz</p>
                                            }
                                        </>
                                    }
                                    {tech.type === null &&
                                        <p>пустой урок</p>
                                    }
                                </div>
                            </Link>

                        )}

                        <Link to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/new`}>
                            <div className="dot ms-3" >
                                <div className="mt-1">
                                    <FontAwesomeIcon icon={faPlus} transform="down-6 grow-3" />
                                </div>
                            </div>
                        </Link>
                    </div>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </>
    )
}
export default EditModuleStage