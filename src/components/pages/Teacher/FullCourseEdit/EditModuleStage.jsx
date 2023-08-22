import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { redirect } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Figure from 'react-bootstrap/Figure';
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { apiUrl, typesApiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from 'react-router-dom';
function EditModuleStage() {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    const [moduleData, setModuleData] = useState([]);
    const [typeStageData, setTypeStageData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    // const {state} = useLocation();
    // const { type } = state; 
    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "module-stage/" + module_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setModuleData(response.data);

                    // setTeacherData(response.data.teacher)
                    // setChapterData(response.data.course_chapters)
                    // setRelatedCourseData(JSON.parse(response.data.related_courses))
                    // setTechnologicalListData(response.data.technological_list)
                    // if (response.data.course_rating !== '' && response.data.course_rating !== null) {
                    //   setAvgRatingStatus(response.data.course_rating)
                    // }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl + "module-stage-detail/" + stage_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setTypeStageData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [module_id,navigate,location]);
    const addStage = () => {
        try {
            axios
                .post(
                    apiUrl + "module-stage/" + module_id,
                    {
                        title: "8",
                        module: module_id,
                        description: "sdsdsd",
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data.id);
                        navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${response.data.id}`)

                    }

                });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(location);



    function AddingClassicLesson() {
        const [classicLessonData, setClassicLessonData] = useState({
            stage: stage_id,
            is_classic: true,
            image: "",
            content: "",
            file: "",
            video_link: "",
            url_link: ""
        });

        console.log(location.state)
        if (location.state ===null){
            return null
        }
        const handleChange = (event) => {
            setClassicLessonData({
                ...classicLessonData,
                [event.target.name]: event.target.value,
            });
            console.log(classicLessonData);
        };
        const handleFileChange = (event) => {
            setClassicLessonData({
                ...classicLessonData,
                [event.target.name]: event.target.files[0],
            });
        };
        const formSubmit = (e) => {
            e.preventDefault();
    
            axios
                .post(
                    typesApiUrl + "classic-lesson/"+stage_id,
                    classicLessonData,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    navigate(-2)
                });
        };
        return(
            <div>
                {location.state.type==="classicLesson" && (
                      <Card>
                      <Card.Header>Добавление классического урока</Card.Header>
                      <Card.Body>
                          <Form>
                      
                              <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCategory"
                              >
                                  <Form.Label>Добавление картинки</Form.Label>
                                  <Form.Control
                                                  name="image"
                                                  type="file"
                                                  onChange={handleFileChange}
                                  />
                              </Form.Group>
      
                              <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCategory"
                              >
                                  <Form.Label>Содержание урока</Form.Label>
                                  <Form.Control
                                      name="content"
                                      as="textarea"
                                      rows={3}
                                      placeholder="Описание"
                                      onChange={handleChange}
                                  />
                              </Form.Group>
                              <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCategory"
                              >
                                  <Form.Label>Добавление файла</Form.Label>
                                  <Form.Control
                                                  name="file"
                                                  type="file"
                                                  onChange={handleFileChange}
                                  />
                              </Form.Group>
                              <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCategory"
                              >
                                  <Form.Label>Добавление ссылки на видео</Form.Label>
                                  <Form.Control
                                      name="video_link"
                                      type="text"
                                      placeholder="Добавление ссылки"
                                      onChange={handleChange}
                                  />
                              </Form.Group>
                              <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCategory"
                              >
                                  <Form.Label>Добавление ссылки на сторонний ресурс</Form.Label>
                                  <Form.Control
                                      name="url_link"
                                      type="text"
                                      placeholder="Добавление ссылки"
                                      onChange={handleChange}
                                  />
                              </Form.Group>
                              <Button
                                  onClick={formSubmit}
                                  variant="primary"
                                  type="submit"
                              >
                                  Submit
                              </Button>
                          </Form>
                      </Card.Body>
                  </Card>
                )}
            </div>
           
        )
    }

    return (
        <>
            <Row>
                <p>Вы перешли на страницу редактирования модуля</p>
                <Col>
                    <div className="ms-3">
                        {moduleData.map((tech, index) => (
                            <Link
                                to={`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${tech.id}`}
                            >
                                <div className="dot ms-3">
                                    {tech.type !== null && (
                                        <>
                                            {tech.type.is_classic === true && (
                                                <p>classic</p>
                                            )}
                                            {tech.type.is_quiz === true && (
                                                <p>quiz</p>
                                            )}
                                        </>
                                    )}
                                    {tech.type === null && <p>пустой урок</p>}
                                </div>
                            </Link>
                        ))}

                        <Link
                            onClick={addStage}
                        >
                            <div className="dot ms-3">
                                <div className="mt-1">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        transform="down-6 grow-3"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>Вы находитесь на странице редактирования этапа обучения</Col>
                {typeStageData.type === null && (
                    <>
                        <p>Вы еще не заполнили ваш урок. </p>
                        <p>Для добавления данных нажмите на кнопку продолжить</p>
                        <div className="mb-2">
                        <Button
                                as={Link}
                                to={
                                    `/edit-course-full/edit-module/${course_id}/${module_id}/stage/${typeStageData.id}/new`
                                }
                                variant="outline-success"
                            >
                                добавить урок 
                            </Button>
                            </div>
                    </>


                )}
                {AddingClassicLesson()}
                {/* {location.state.type ==='classicLesson' ? <p>ddddddddddd</p>: null} */}
            
            </Row>
        </>
    );
}
export default EditModuleStage;

