import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function TeacherDetail() {
    let { teacher_id } = useParams();

    const [courseData, setCourseData] = useState([]);
    const [skillListData, setSkillListData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get(
    //             apiUrl + "teacher/" + teacher_id
    //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    //             // ,{headers: { "Content-Type": "multipart/form-data" }}
    //         )
    //         .then((response) => {
    //             setCourseData(response.data.teacher_course);
    //             setTeacherData(response.data);
    //             setSkillListData(response.data.skill_list);
    //             console.log(response.data);
    //         });
    // }, []);
    return (
        <div className="mx-3">
            <p>В разработке</p>
            {/* <div className="shadow rounded p-3 mt-3 mb-5">
                <div className="mt-5">
                    <div md={4}>
                        <Image variant="top" src="/images/code.jpg" thumbnail />
                    </div>
                    <div md={8}>
                        <h3>{teacherData.full_name}</h3>
                        <p>{teacherData.detail}</p>
                        <p>
                            Мои скиллы:&nbsp;
                            {skillListData.map((skill, index) => (
                                <Badge
                                    as={Link}
                                    to={`/courses-by-skills/${skill.trim()}/${teacherData.id
                                        }`}
                                    pill
                                    bg="success"
                                >
                                    {skill.trim()}
                                </Badge>
                            ))}
                        </p>
                        <p>
                            Последние добавленные курсы:{" "}
                            <Link to="#">React + Django курс</Link>
                        </p>
                        <p>Количество учащихся: 600 учеников</p>
                    </div>
                </div>
                <div>
                    <div>Список курсов</div>
                    <ListGroup variant="flush">
                        {courseData.map((course, index) => (
                            <ListGroup.Item
                                as={Link}
                                to={`/detail/${course.id}`}
                            >
                                {course.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div> */}
        </div>
    );
}
export default TeacherDetail;
