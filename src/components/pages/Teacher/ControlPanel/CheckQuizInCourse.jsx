import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { quizApiUrl } from "../../../../shared/config";

function CheckQuizInCourse(props) {
    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem("teacherId");

    // const [avgRatingStatus, setAvgRatingStatus] = useState("")
    // console.log(teacherId)
    useEffect(() => {
        try {
            axios
                .get(
                    `${quizApiUrl}get-quiz-assign-status/${props.quiz}/${props.course}`
                )
                .then((response) => {
                    setQuizData(response.data);
                    console.log(response.data);

                    // setAvgRatingStatus
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    console.log(quizData);

    const handleAssignQuiz = (quiz_id) => {
        try {
            axios
                .post(
                    quizApiUrl + "quiz-assign-course/",
                    {
                        teacher: teacherId,
                        quiz: props.quiz,
                        course: props.course,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <td>
                {quizData.bool == false && (
                    <Button
                        onClick={() => handleAssignQuiz(props.quiz)}
                        variant="primary"
                        type="submit"
                    >
                        привязать квиз к курсу
                    </Button>
                )}
                {quizData.bool == true && (
                    <span className="text-success">квиз добавлен</span>
                )}
            </td>
        </>
    );
}
export default CheckQuizInCourse;
