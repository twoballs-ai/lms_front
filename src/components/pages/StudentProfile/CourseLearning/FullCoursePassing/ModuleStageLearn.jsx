import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { apiLmsUrl } from "../../../../../shared/config";
import axios from "axios";

import "./FullCourseLearn.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
// import AddStageLesson from "./AddStageLesson";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
import CourseEditorService from "../../../../../services/course.editor.service";
import { SettingOutlined } from '@ant-design/icons';
import PopupMenu from "../../../../reUseComponents/PopupMenu";
import TextInput from "../../../../reUseComponents/TextInput";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";

function ModuleStageLearn({ moduleEditData, setModuleEditData, getChapters, setGetChapters }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [inputTitleValue, setInputTitleValue] = useState(moduleEditData.title || '');
    const [inputDescrValue, setInputDescreValue] = useState(moduleEditData.description || '');
    const [handlePopupOpen, setHandlePopupOpen] = useState(false);

    useEffect(() => {
        setInputTitleValue(moduleEditData.title);
        setInputDescreValue(moduleEditData.description);
    }, [moduleEditData]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleInputChange = (e) => setInputTitleValue(e.target.value);
    const handleInputDescrChange = (e) => setInputDescreValue(e.target.value);

    const handleShowClassicLesson = async () => {
        const dataParams = { module_id: moduleEditData.id, title: "", html_code_text: "" };
        const response = await CourseEditorService.editCoursePageAddClassicLesson(dataParams);
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData(prevModuleData => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    const handleShowVideoLesson = async () => {
        const dataParams = { module_id: moduleEditData.id, title: "", video_link: "" };
        const response = await CourseEditorService.editCoursePageAddVideoLesson(dataParams);
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData(prevModuleData => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    const handleShowQuizLesson = async () => {
        const dataParams = { module_id: moduleEditData.id, title: "" };
        const response = await CourseEditorService.editCoursePageAddQuizLesson(dataParams);
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData(prevModuleData => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    const handleSelectStage = (tech) => setSelectedStage(tech);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await CourseEditorService.editCoursePageGetModuleStage(moduleEditData.id);
            if (response.status === 200 || response.status === 201) {
                setModuleData(response.data.data);
                if (response.data.data.length !== 0) {
                    setSelectedStage(response.data.data[0]);
                } else {
                    setSelectedStage(null);
                }
            }
        };
        fetchData();
    }, [moduleEditData]);

    const addStage = () => handleOpenModal();

    const showPopupMenu = () => setHandlePopupOpen(true);
    const handlePopupClose = () => setHandlePopupOpen(false);


    const Dot = ({ tech, isActive }) => {
        const activeClass = isActive ? "active" : "";
        return (
            <div className={`dot ${activeClass}`} onClick={() => handleSelectStage(tech)}>
                {tech.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
                {tech.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
                {tech.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
                {!["video", "classic", "quiz"].includes(tech.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
            </div>
        );
    };

    return (
        <>
           <div className="main__nav-block">
                <p>Вы перешли на страницу редактирования модуля: "{moduleEditData.title}"</p>
                <div className="nav-block__popup-menu">
                    <button className="popup-menu__button" onClick={showPopupMenu}>
                        <SettingOutlined style={{ fontSize: '24px' }} />
                    </button>
                </div>
                <div className="nav-block__stages">
                    {moduleData.length < 20 && <div className="stages__add"><LmsButton buttonText={"Добавить урок"} handleClick={addStage} /></div>}
                    <div className="stages__case">
                        {moduleData.map((tech) => (
                            <div key={tech.id}>
                                <Dot tech={tech} isActive={selectedStage && tech.id === selectedStage.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedStage && (
                <div className="main__content">
                    <div className="content__mini-menu">
                        <LmsButton buttonText={"Удалить урок"} handleClick={deleteStage} />
                    </div>
                    {selectedStage.type === "classic" && <AddingClassicLesson selectedStage={selectedStage} />}
                    {selectedStage.type === "video" && <AddingVideoLesson selectedStage={selectedStage} />}
                    {selectedStage.type === "quiz" && <AddingQuizLesson selectedStage={selectedStage} />}
                </div>
            )}
        </>
    );
}

export default ModuleStageLearn;