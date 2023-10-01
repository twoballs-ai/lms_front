import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { apiUrl, serverUrl } from "../../../shared/config";

function CourseDetail() {
    let { course_id } = useParams();
    const [show, setShow] = useState(false);
    const [showRate, setShowRate] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [technologicalListData, setTechnologicalListData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [userLoggedStatus, setUserLoggedStatus] = useState("");
    const [enrollStatus, setEnrollStatus] = useState("");
    const [courseViews, setCourseViews] = useState(0);
    const [ratingStatus, setRatingStatus] = useState("");
    const [avgRatingStatus, setAvgRatingStatus] = useState("");
    const handleCloseRate = () => setShowRate(false);
    const handleShowRate = () => setShowRate(true);
    const [favoriteStatus, setFavoriteStatus] = useState("");
    const studentId = localStorage.getItem("studentId");
    const [ratingData, setRatingData] = useState({
        rating: "1",
        review: "",
    });

    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "course/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setCourseData(response.data);
                    setTeacherData(response.data.teacher);
                    setRelatedCourseData(
                        JSON.parse(response.data.related_courses)
                    );
                    setTechnologicalListData(response.data.technological_list);
                    if (
                        response.data.course_rating !== "" &&
                        response.data.course_rating !== null
                    ) {
                        setAvgRatingStatus(response.data.course_rating);
                    }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        axios.get(apiUrl + "update-view/" + course_id).then((res) => {
            setCourseViews(res.data.views);
        });
        //  узнаем подписан ли ученик
        try {
            axios
                .get(
                    apiUrl +
                        "enroll-course-status/" +
                        studentId +
                        "/" +
                        course_id
                )
                .then((response) => {
                    if (response.data.bool == true) {
                        setEnrollStatus("success");
                    }
                });
        } catch (error) {
            console.log(error);
        }

        try {
            axios
                .get(
                    apiUrl + "get-rating-status/" + studentId + "/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    if (response.data.bool == true) {
                        setRatingStatus("success");
                        console.log(response.data);
                    }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl +
                        "get-favorite-status/" +
                        studentId +
                        "/" +
                        course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    if (response.data.bool == true) {
                        setFavoriteStatus("success");
                    } else {
                        setFavoriteStatus("");
                    }

                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        const studentLoginStatus = localStorage.getItem("studentLoginStatus");
        if (studentLoginStatus === "true") {
            setUserLoggedStatus("success");
        }
    }, [course_id]);
    document.title = `Курс - ${courseData.title}`;
    const enrollCourse = () => {
        try {
            axios
                .post(
                    apiUrl + "student-course-enroll/",
                    {
                        student: studentId,
                        course: course_id,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
      
                        setEnrollStatus("success");

                        // window.location.reload()
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    // функция рейтинг
    const handleChange = (event) => {
        setRatingData({
            ...ratingData,
            [event.target.name]: event.target.value,
        });
        console.log(ratingData);
    };

    const ratingSubmit = (e) => {
        e.preventDefault();

        try {
            axios
                .post(
                    apiUrl + "course-rating/" + course_id,
                    {
                        rating: ratingData.rating,
                        review: ratingData.review,
                        student: studentId,
                        course: course_id,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        console.log(response.data);
                        // setShow(false)
                        // setEnrollStatus('success')
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const addToFavorite = () => {
        try {
            axios
                .post(
                    apiUrl + "add-favorite-courses/",
                    {
                        student: studentId,
                        course: course_id,
                        is_favorite: true,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
           
                        console.log(response.data);
                        // setShow(false)
                        // setEnrollStatus('success')
                        setFavoriteStatus("success");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const removeFromFavorite = () => {
        try {
            axios
                .get(
                    apiUrl +
                        "remove-favorite-courses/" +
                        studentId +
                        "/" +
                        course_id,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
               
                        console.log(response.data);
                        // setShow(false)
                        // setEnrollStatus('success')
                        setFavoriteStatus("");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col md={4}>
                        <Image
                            variant="top"
                            src={courseData.course_image}
                            thumbnail
                        />
                    </Col>
                    <Col md={8}>
                        <h3>Курс: {courseData.title}</h3>
                        <h5>Описание:</h5>
                        <p>{courseData.description}</p>
                        <p>
                            Автор курса:{" "}
                            <Link to={`/teacher-detail/${teacherData.id}`}>
                                {teacherData.full_name}
                            </Link>
                        </p>
                        <p>
                            Технологии:&nbsp;
                            {/* пофиксить: */}
                            {technologicalListData.map((tech, index) => (
                                <Badge
                                    // as={Link} to={`/courses-by-cat/${tech.trim()}`}
                                    pill
                                    bg="success"
                                >
                                    {tech.trim()}
                                </Badge>
                            ))}
                        </p>

                        <p>Длительность курса:</p>
                        <p>
                            Всего подписавшихся пользователей:{" "}
                            <Badge bg="success">
                                {courseData.total_enrolled_students}
                            </Badge>
                        </p>
                        <p>
                            Оценка курса: {avgRatingStatus}/5
                            {enrollStatus === "success" &&
                                userLoggedStatus === "success" && (
                                    <>
                                        {ratingStatus !== "success" && (
                                            <Button
                                                onClick={handleShowRate}
                                                variant="primary"
                                            >
                                                {" "}
                                                Рейтинг{" "}
                                                <FontAwesomeIcon
                                                    icon={faCirclePlus}
                                                />
                                            </Button>
                                        )}
                                        {ratingStatus === "success" && (
                                            <Badge bg="warning">
                                                {" "}
                                                Вы уже оценили этот курс
                                            </Badge>
                                        )}
                                        <Modal
                                            show={showRate}
                                            onHide={handleCloseRate}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>
                                                    Оценить курс:{" "}
                                                    {courseData.title}
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label>
                                                            Рейтинг
                                                        </Form.Label>
                                                        {["radio"].map(
                                                            (type) => (
                                                                <div
                                                                    key={`inline-${type}`}
                                                                    className="mb-3"
                                                                >
                                                                    <Form.Check
                                                                        inline
                                                                        value="1"
                                                                        label="1"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        name="rating"
                                                                        type={
                                                                            type
                                                                        }
                                                                        id={`inline-${type}-1`}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        value="2"
                                                                        label="2"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        name="rating"
                                                                        type={
                                                                            type
                                                                        }
                                                                        id={`inline-${type}-2`}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        value="3"
                                                                        label="3"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        name="rating"
                                                                        type={
                                                                            type
                                                                        }
                                                                        id={`inline-${type}-3`}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        value="4"
                                                                        label="4"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        name="rating"
                                                                        type={
                                                                            type
                                                                        }
                                                                        id={`inline-${type}-4`}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        value="5"
                                                                        label="5"
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        name="rating"
                                                                        type={
                                                                            type
                                                                        }
                                                                        id={`inline-${type}-5`}
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Form.Label>
                                                            написать отзыв
                                                        </Form.Label>
                                                        <Form.Control
                                                            onChange={
                                                                handleChange
                                                            }
                                                            as="textarea"
                                                            rows={3}
                                                            name="review"
                                                            placeholder="review"
                                                        />
                                                    </Form.Group>
                                                    <Button
                                                        onClick={ratingSubmit}
                                                        variant="primary"
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    </>
                                )}
                        </p>
                        <p>
                            Просмотры курса:{" "}
                            <Badge bg="success">{courseViews}</Badge>
                        </p>
                        {enrollStatus === "success" &&
                            userLoggedStatus === "success" && (
                                <p>
                                    <span>Вы уже подписаны на курс</span>
                                    <br />
                                    <Button
                                        as={Link}
                                        title="Проходить курс"
                                        to={"/course-study/" + course_id}
                                        variant="primary"
                                    >
                                        Проходить курс
                                    </Button>
                                </p>
                            )}
                        {userLoggedStatus === "success" &&
                            enrollStatus !== "success" && (
                                <Button
                                    as={Link}
                                    to={"#"}
                                    onClick={enrollCourse}
                                    variant="primary"
                                >
                                    Подписаться на курс{" "}
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            )}
                        {userLoggedStatus === "success" &&
                            favoriteStatus !== "success" && (
                                <Button
                                    as={Link}
                                    title="В избранное"
                                    to={"#"}
                                    onClick={addToFavorite}
                                    variant="danger"
                                >
                                    Добавить в избранные курсы
                                </Button>
                            )}
                        {userLoggedStatus === "success" &&
                            favoriteStatus === "success" && (
                                <Button
                                    as={Link}
                                    title="В избранное"
                                    to={"#"}
                                    onClick={removeFromFavorite}
                                    variant="primary"
                                >
                                    удалить из избранного
                                </Button>
                            )}
                        {userLoggedStatus !== "success" && (
                            <p className="text-danger">
                                Авторизуйтесь что бы записаться на курс
                                <Button
                                    className="m-2"
                                    as={Link}
                                    to={"/student-login"}
                                    variant="primary"
                                >
                                    Авторизация{" "}
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Button>
                            </p>
                        )}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <hr />
                    <h3>Схожие курсы:</h3>
                    {relatedCourseData.map((related, index) => (
                        <Col>
                            <Card style={{ width: "10rem" }}>
                                <Link
                                    target="_blank"
                                    to={`/detail/${related.pk}`}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`${serverUrl}media/${related.fields.course_image}`}
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        <Link
                                            target="_blank"
                                            to={`/detail/${related.pk}`}
                                        >
                                            {related.fields.title}
                                        </Link>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
export default CourseDetail;
