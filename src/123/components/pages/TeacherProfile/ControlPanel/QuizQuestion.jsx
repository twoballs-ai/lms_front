import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { quizApiUrl } from "../../../../shared/config";


function QuizQuestion() {
    const [quizQuestionData, setQuizQuestionData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { quiz_id } = useParams();
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                quizApiUrl + "quiz-questions/" + quiz_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setQuizQuestionData(response.data);
                setTotalResult(response.data.length);
                console.log(response.data);
            });
    }, [totalResult]);
    const handleDeleteClick = (question_id) => {

        try {
            axios
                .delete(quizApiUrl + "question-for-quiz/" + question_id)
                .then((response) => {

                    setTotalResult(response.data.length);
                });

        } catch (error) {

        }

    };
    return (
        <>
            <div>
                <div>
                    Все вопросы квиза ({totalResult}){" "}
                    <Button
                        className="float-end"
                        as={Link}
                        to={"/teacher-profile/add-quiz-question/" + quiz_id}
                    >
                        Добавить вопрос для квиза
                    </Button>{" "}
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>вопрос</th>
                                <th>действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizQuestionData.map((quiz, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={
                                                "/teacher-profile/edit-question/" +
                                                quiz.id
                                            }
                                            variant="primary"
                                        >
                                            {quiz.questions}
                                        </Link>{" "}
                                    </td>
                                    <td>
                                        <Button
                                            as={Link}
                                            to={
                                                "/teacher-profile/edit-question/" +
                                                quiz.id
                                            }
                                            variant="primary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />
                                        </Button>{" "}
                                        <Button
                                            onClick={() =>
                                                handleDeleteClick(quiz.id)
                                            }
                                            variant="danger"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                        </Button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default QuizQuestion;
