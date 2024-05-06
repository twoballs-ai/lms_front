import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";



import CheckQuizInCourse from "./CheckQuizInCourse";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiUrl, quizApiUrl } from "../../../../shared/config";

function AssignQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem("teacherId");
    const { course_id } = useParams();
    // const [avgRatingStatus, setAvgRatingStatus] = useState("")
    // console.log(teacherId)
    useEffect(() => {
        try {
            axios
                .get(
                    quizApiUrl + "teacher-quiz/" + teacherId
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setQuizData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUrl + "course/" + course_id
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div>
                <div>
                    Привязать квиз к курсу{" "}
                    <span className="text-primary">({courseData.title})</span>
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizData.map((quiz, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={
                                                "/teacher-profile/all-question/" +
                                                quiz.id
                                            }
                                        >
                                            {quiz.title}
                                        </Link>
                                    </td>
                                    <CheckQuizInCourse
                                        quiz={quiz.id}
                                        course={course_id}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default AssignQuiz;
