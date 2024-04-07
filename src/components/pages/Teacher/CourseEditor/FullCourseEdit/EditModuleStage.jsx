import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { apiLmsUrl } from "../../../../../shared/config";
import axios from "axios";

import "./FullCourseEdit.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
import AddStageLesson from "./AddStageLesson";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";

function EditModuleStage() {

    const [showClassicLesson, setShowClassicLesson] = useState(false);

    const [moduleData, setModuleData] = useState([]);
    // const [stagePkData, setStagePkData] = useState("");
    // const [typeStageData, setTypeStageData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    // const styleIndex = {
    //     left: "26px",
    //     top: "-20px",
    // };
    // // const {state} = useLocation();
    // // const { type } = state;
    let { module_id, course_id, stage_id } = useParams();

    const [selectedStage, setSelectedStage] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const handleDeleteStage = async () => {
        // Логика для удаления этапа
        // Можно отправлять запрос на сервер или обновлять локальное состояние
    };
    const handleShowClassicLesson = () => {
        // Переключаем состояние showClassicLesson
        setShowClassicLesson(!showClassicLesson);
        handleCloseModal()
    };
    const handleSelectStage = (tech) => {
        setSelectedStage(tech);
    };
    useEffect(() => {
        const fetchData = () => {
            axios
                .get(
                    `${apiLmsUrl}course-chapter-module-stage-list/${module_id}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                ).then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        setModuleData(response.data.data);
                        // // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                        // setStagePkData(
                        //     response.data[parseInt(stage_id) - 1] &&
                        //         response.data[parseInt(stage_id) - 1]["id"]
                        // );
                    }
                });
        };
        fetchData();
    }, [location]);


    const addStage = () => {
        console.log("123")
        const dataParams = {
            module_id: module_id,
            title: "Этап",
        }
        try {
            axios
                .post(
                    `${apiLmsUrl}add_stage_to_module/`,
                    dataParams,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response.data.modules);
                    if (response.status === 200) {

                        console.log(response.data)
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {

        }
    };

    console.log(moduleData);
    const [openedStage, setOpenedStage] = useState(null);
    const contentToModal = (<AddStageLesson handleShowClassicLesson={handleShowClassicLesson} />)


    // Обработчик для открытия элемента
    const handleStageClick = (stageId) => {
        setOpenedStage(stageId);
        console.log("dd")
    };
    return (
        <>
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentToModal} />
            <div className="main__nav-block"><p className="">Вы перешли на страницу редактирования модуля {module_id} </p>{" "}
                <div className="nav-block__stages" >
                    {moduleData.length < 20 && (
                        // <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <div className="stages__add"><LmsButton buttonText={"Добавить этап"} handleClick={addStage} /></div>


                    )}
                    <div className="stages__case">
                        {moduleData.map((tech, index) => (
                            <div className="" key={tech.id}>

                                <div className="dot" onClick={() => handleSelectStage(tech)}>

                                    <>
                                        {tech.items.type === "classic" ? (
                                            <div className="mt-1">
                                                <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />
                                            </div>
                                        ) : (
                                            <div className="mt-1">
                                                <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />
                                            </div>
                                        )}
                                        {/* {tech.item.type === "classic" && (
                                            <div className="mt-1">
                                                <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />
                                            </div>
                                        )} */}
                                        {/* {tech.type.is_quiz === true && (
                                            <div className="mt-1">
                                                <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />
                                            </div>
                                        )} */}
                                        {/* {tech.type.is_video === true && (
                                            <div className="mt-1">
                                                <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />
                                            </div>
                                        )} */}
                                    </>

                                    {/* <div className="mt-1">
                                        <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />
                                    </div> */}

                                </div>
                            </div>
                        ))}
                    </div>
                    {/* {selectedStage === 1 && (
                    <button type="button" className="btn btn-danger mt-3" onClick={handleDeleteStage}>
                        Удалить {selectedStage} этап
                    </button>
                )} */}


                </div>
            </div>
            <div className="main__content">
                <p>Вы еще не заполнили ваш урок . </p>
                <div className="mb-2">
                    <div>

                        <LmsButton buttonText={"заполнить урок"} handleClick={handleOpenModal} />
                    </div>

                    {showClassicLesson && <AddingClassicLesson selectedStage={selectedStage} />}
                    {
                        selectedStage && selectedStage.items.type === "classic" && <AddingClassicLesson selectedStage={selectedStage} />
                    }
                </div>
            </div>


        </>
    );
}
export default EditModuleStage;
