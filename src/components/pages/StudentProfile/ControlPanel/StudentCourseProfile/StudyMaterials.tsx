import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../../../../shared/config";


function StudentStudyMaterials() {
    const [studyData, setStudyData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { course_id } = useParams();
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "student/study-materials/" + course_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setStudyData(response.data);
                setTotalResult(response.data.length);
                console.log(response.data);
            });
    }, [totalResult]);

    const downloadFile = (file_url) => {
        window.location.href = file_url;
    };
    return (
        <>
            <div>
                <div>Все материалы курса ({totalResult})</div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Детали</th>
                                <th>Загрузка</th>
                                <th>комментарии</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studyData.map((materials, index) => (
                                <tr key={index}>
                                    <td>{materials.title}</td>
                                    <td>{materials.description}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                downloadFile(materials.upload)
                                            }
                                            variant="primary"
                                        >
                                            Скачать
                                        </Button>{" "}
                                    </td>
                                    <td>{materials.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default StudentStudyMaterials;
