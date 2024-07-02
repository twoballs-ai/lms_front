import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { apiLmsUrl } from "../../../../../shared/config";
import axios from "axios";

import "./FullCourseEdit.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
import AddStageLesson from "./AddStageLesson";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
import CourseEditorService from "../../../../../services/course.editor.service";
import { SettingOutlined } from '@ant-design/icons';
import PopupMenu from "../../../../reUseComponents/PopupMenu";
import TextInput from "../../../../reUseComponents/TextInput";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";

function EditModuleStage({ moduleEditData, setModuleEditData }) {
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
    console.log(moduleEditData)
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
    const contentToModal = (<AddStageLesson handleShowClassicLesson={handleShowClassicLesson} handleShowVideoLesson={handleShowVideoLesson} handleShowQuizLesson={handleShowQuizLesson} />);

    const showPopupMenu = () => setHandlePopupOpen(true);
    const handlePopupClose = () => setHandlePopupOpen(false);

    const popupContent = () => {
        const UpdateModule = async () => {
            const dataParams = { title: inputTitleValue, description: inputDescrValue };
            const response = await CourseEditorService.editCoursePageUpdateModule(moduleEditData.id, dataParams);
            if (response.status === 200 || response.status === 201) {
                const updatedModule = response.data.data;
                const newData = chapters.map(chapter => {
                    if (chapter.id === updatedModule.chapter_id) {
                        const updatedModules = chapter.modules.map(module =>
                            module.id === updatedModule.id ? updatedModule : module
                        );
                        return { ...chapter, modules: updatedModules };
                    }
                    return chapter;
                });
                setGetChapters(newData);
                setModuleEditData(updatedModule);
            }
        };

        const deleteModule = async () => {

            const deleteResponse = await CourseEditorService.editCoursePageDeleteModule(moduleEditData.id);
            if (deleteResponse.status === 200 || deleteResponse.status === 201) {
                // Фильтрация удаленного модуля из состояния
                const updatedChapters = chapters.map(chapter => {
                    if (chapter.id === moduleEditData.chapter_id) {
                        const remainingModules = chapter.modules.filter(module => module.id !== moduleEditData.id);
                        // Пересчет sort_index для оставшихся модулей
                        const updatedModules = remainingModules.map((module, index) => ({
                            ...module,
                            sort_index: index + 1
                        }));
                        return { ...chapter, modules: updatedModules };
                    }
                    return chapter;
                });
                setGetChapters(updatedChapters);
                setModuleEditData({});
        
                // Обновление sort_index на сервере для каждого модуля
                for (const chapter of updatedChapters) {
                    if (chapter.id === moduleEditData.chapter_id) {
                        for (const module of chapter.modules) {
                            try {
                                const updateResponse = await CourseEditorService.editCoursePagePatchModule(module.id, {
                                    sort_index: module.sort_index
                                });
                                if (!(updateResponse.status === 200 || updateResponse.status === 201)) {
                                    console.error('Failed to update module sort_index:', updateResponse);
                                }
                            } catch (error) {
                                console.error('Error updating module sort_index:', error);
                            }
                        }
                    }
                }
            } else {
                console.error('Failed to delete module:', deleteResponse);
            }
        };

        return (
            <>
                <div style={{ borderRadius: '10px', backgroundColor: '#e9e9e9', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <p>Название модуля:</p>
                    <TextInput isTextArea={false} placeholder={"Напишите сюда название модуля"} value={inputTitleValue} onChange={handleInputChange} />
                    <p>Описание модуля:</p>
                    <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />
                    <LmsButton buttonText={"Обновить"} handleClick={UpdateModule} />
                </div>
                <div style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
                    <LmsButton buttonText={"Удалить модуль"} handleClick={deleteModule} />
                </div>
            </>
        );
    };

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
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentToModal} />
            <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={handlePopupClose} title={`Найстроки модуля: ${moduleEditData.title}`} popupContent={popupContent()} />
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

export default EditModuleStage;