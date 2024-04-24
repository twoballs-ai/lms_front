import React, { useState, useEffect, useLayoutEffect } from "react";
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
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";

function EditModuleStage({ moduleEditData }) {

    const [addClasiclesson, setAddClassiclesson] = useState(false);
    const [addVideolesson, setAddVideolesson] = useState(false);

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
        // console.log("ddd")
        setAddClassiclesson(true);
        handleCloseModal()
    };
    const handleShowVideoLesson = () => {
        // Переключаем состояние showClassicLesson
        console.log(addVideolesson)

        setAddVideolesson(true);
        handleCloseModal()
    };
    const handleSelectStage = (tech) => {
        // console.log(tech)
        setAddClassiclesson(false);
        setAddVideolesson(false);
        setSelectedStage(tech);
    };
    // console.log(selectedStage)
    // useEffect(() => {
    //     setShowClassicLesson(false);
    // }, [selectedStage]);
    useLayoutEffect(() => {
        const fetchData = () => {
            axios
                .get(
                    `${apiLmsUrl}course-chapter-module-stage-list/${moduleEditData.id}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                ).then((response) => {

                    if (response.status === 200 || response.status === 201) {

                        setModuleData(response.data.data);
                        if (response.data.data.length !== 0) {
                            console.log(response.data.data[0])
                            // console.log(response.data.data[0]);
                            // Устанавливаем selectedStage во второй элемент массива data
                            setSelectedStage(response.data.data[0]);
                        } else {
                            // Устанавливаем selectedStage в первый элемент массива data
                            setSelectedStage(null);
                        }
                        // setStagePkData(
                        //     response.data[parseInt(stage_id) - 1] &&
                        //         response.data[parseInt(stage_id) - 1]["id"]
                        // );
                    }
                });
        };
        fetchData();
    }, [moduleEditData]);


    const addStage = () => {

        const dataParams = {
            module_id: moduleEditData.id,
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
                    // console.log(response.data.modules);
                    if (response.status === 200) {
                        setModuleData(prevModuleData => [...prevModuleData, response.data.modules]);
                        // console.log(response.data)
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {

        }
    };

    const [openedStage, setOpenedStage] = useState(null);
    const contentToModal = (<AddStageLesson handleShowClassicLesson={handleShowClassicLesson} handleShowVideoLesson={handleShowVideoLesson} />)


    // Обработчик для открытия элемента
    const handleStageClick = (stageId) => {
        setOpenedStage(stageId);

    };

    const Dot = ({ tech, isActive }) => {

        const activeClass = isActive ? "active" : "";
        return (
            <div className={`dot ${activeClass}`} onClick={() => handleSelectStage(tech)}>

                <>
                    {tech.items.type === "video" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />
                        </div>
                    ) : tech.items.type === "classic" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />
                        </div>
                    ) : tech.items.type === "quiz" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />
                        </div>
                    ) : (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />
                        </div>
                    )}

                </>



            </div>
        )

    }
    console.log(selectedStage)
    return (
        <>
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentToModal} />
            <div className="main__nav-block"><p>Вы перешли на страницу редактирования модуля: "{moduleEditData.title}"</p>{" "}
                <div className="nav-block__stages" >
                    {moduleData.length < 20 && (
                        // <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <div className="stages__add"><LmsButton buttonText={"Добавить этап"} handleClick={addStage} /></div>


                    )}
                    <div className="stages__case">
                        {moduleData.map((tech, index) => (
                            <div className="" key={tech.id}>
                                <Dot tech={tech} isActive={selectedStage && tech.id === selectedStage.id} />
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

                <div className="mb-2">
                    {moduleData.length > 0 && (
                        selectedStage && selectedStage?.items && Object.keys(selectedStage.items).length === 0) && (
                            <div>
                                <p>Вы еще не заполнили ваш урок . </p>
                                <LmsButton buttonText={"заполнить урок"} handleClick={handleOpenModal} />
                            </div>

                        )}
                    {selectedStage && (
                        (selectedStage.items.type === "classic" && <AddingClassicLesson selectedStage={selectedStage} addClasiclesson={addClasiclesson} setModuleData={setModuleData} />) ||
                        (selectedStage.items.type === "video" && <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} />)
                        // (selectedStage.items.type === "video" && <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} />)
                    )}
                    {/* <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} /> */}

                    {/* {selectedStage ? <AddingClassicLesson addClasiclesson={addClasiclesson} setModuleData={setModuleData} /> : ""} */}
                    {/* {addClasiclesson ? (
                        <AddingClassicLesson selectedStage={selectedStage} addClasiclesson={addClasiclesson} setModuleData={setModuleData} />
                    ) : addVideolesson ? (
                        <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} />
                    ) : null} */}

                    {/* <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} /> */}


                </div>
            </div>


        </>
    );
}
export default EditModuleStage;
