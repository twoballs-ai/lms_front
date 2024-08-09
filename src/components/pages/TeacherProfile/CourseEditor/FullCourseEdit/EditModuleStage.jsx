import React, { useState, useEffect, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
import CourseEditorService from "../../../../../services/course.editor.service";
import { SettingOutlined } from '@ant-design/icons';
import PopupMenu from "../../../../reUseComponents/PopupMenu";
import ModulePopupMenu from "../components/LeftBar/utils/ModulePopupMenu";
import AddStageLesson from "./AddStageLesson";
import "./FullCourseEdit.scss";
function EditModuleStage({ moduleEditData, setModuleEditData, chapters, setGetChapters }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [handlePopupOpen, setHandlePopupOpen] = useState(false);

    useEffect(() => {
        setSelectedStage(moduleEditData?.stages?.[0] || null);
    }, [moduleEditData]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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

    const handleSelectStage = (stage) => setSelectedStage(stage);

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

    const deleteStage = async () => {
        const response = await CourseEditorService.editCoursePageDeleteStage(selectedStage.id);
        if (response.status === 200 || response.status === 201) {
            const updatedModuleData = moduleData.filter(stage => stage.id !== selectedStage.id);
            setModuleData(updatedModuleData);
            if (updatedModuleData.length > 0) {
                setSelectedStage(updatedModuleData[0]);
            } else {
                setSelectedStage(null);
            }
        }
    };

    const Dot = ({ stage, isActive }) => {
        const activeClass = isActive ? "active" : "";
        return (
            <div className={`dot ${activeClass}`} onClick={() => handleSelectStage(stage)}>
                {stage.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
                {stage.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
                {stage.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
                {!["video", "classic", "quiz"].includes(stage.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
            </div>
        );
    };

    return (
        <>
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={
                <AddStageLesson
                    handleShowClassicLesson={handleShowClassicLesson}
                    handleShowVideoLesson={handleShowVideoLesson}
                    handleShowQuizLesson={handleShowQuizLesson}
                />
            } />
            <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={() => setHandlePopupOpen(false)} title={`Найстроки модуля: ${moduleEditData.title}`}>
                <ModulePopupMenu
                    moduleEditData={moduleEditData}
                    setModuleEditData={setModuleEditData}
                    chapters={chapters}
                    setGetChapters={setGetChapters}
                    handlePopupClose={() => setHandlePopupOpen(false)}
                />
            </PopupMenu>
<div className="main__nav-block">
                <p>Вы перешли на страницу редактирования модуля: "{moduleEditData.title}"</p>
                <div className="nav-block__popup-menu">
                    <button className="popup-menu__button" onClick={() => setHandlePopupOpen(true)}>
                        <SettingOutlined style={{ fontSize: '24px' }} />
                    </button>
                </div>
                <div className="nav-block__stages">
                    {moduleData.length < 20 && <div className="stages__add"><LmsButton buttonText={"Добавить урок"} handleClick={addStage} /></div>}
                    <div className="stages__case">
                        {moduleData.map((stage) => (
                            <div key={stage.id}>
                                <Dot stage={stage} isActive={selectedStage && stage.id === selectedStage.id} />
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

export default EditModuleStage;
