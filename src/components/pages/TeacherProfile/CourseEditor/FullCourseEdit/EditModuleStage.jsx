import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faGhost,
    faChalkboardUser,
    faFilm,
    faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
import AddStageLesson from "./AddStageLesson";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
import "./FullCourseEdit.scss";
import CourseEditorService from "../../../../../services/course.editor.service";
import { SettingOutlined } from "@ant-design/icons";
import ModulePopupMenu from "../components/LeftBar/utils/ModulePopupMenu";

function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.tech.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <props.DotComponent tech={props.tech} isActive={props.isActive} />
        </div>
    );
}

function EditModuleStage({ course_id, moduleEditData, setModuleEditData }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [handlePopupOpen, setHandlePopupOpen] = useState(false);

    const handleShowClassicLesson = async () => {
        const dataParams = {
            module_id: moduleEditData.id,
            title: "",
            html_code_text: "",
        };
        const response =
            await CourseEditorService.editCoursePageAddClassicLesson(
                dataParams
            );
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData((prevModuleData) => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    const handleShowVideoLesson = async () => {
        const dataParams = {
            module_id: moduleEditData.id,
            title: "",
            video_link: "",
        };
        const response = await CourseEditorService.editCoursePageAddVideoLesson(
            dataParams
        );
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData((prevModuleData) => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    const handleShowQuizLesson = async () => {
        const dataParams = { module_id: moduleEditData.id, title: "" };
        const response = await CourseEditorService.editCoursePageAddQuizLesson(
            dataParams
        );
        if (response.status === 200 || response.status === 201) {
            const newElement = response.data.data;
            setModuleData((prevModuleData) => [...prevModuleData, newElement]);
            setSelectedStage(newElement);
        }
        handleCloseModal();
    };

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response =
                await CourseEditorService.editCoursePageGetModuleStage(
                    moduleEditData.id
                );
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

    const handleSelectStage = (tech) => setSelectedStage(tech);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const addStage = () => handleOpenModal();
    const contentToModal = (
        <AddStageLesson
            handleShowClassicLesson={handleShowClassicLesson}
            handleShowVideoLesson={handleShowVideoLesson}
            handleShowQuizLesson={handleShowQuizLesson}
        />
    );

    const showPopupMenu = () => setHandlePopupOpen(true);
    const handlePopupClose = () => setHandlePopupOpen(false);

    const deleteStage = async () => {
        const response = await CourseEditorService.editCoursePageDeleteStage(
            selectedStage.id
        );
        if (response.status === 200 || response.status === 201) {
            const updatedModuleData = moduleData.filter(
                (stage) => stage.id !== selectedStage.id
            );
            setModuleData(updatedModuleData);
            if (updatedModuleData.length > 0) {
                setSelectedStage(updatedModuleData[0]);
            } else {
                setSelectedStage(null);
            }
        }
    };

const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
        setModuleData((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            const newOrder = arrayMove(items, oldIndex, newIndex);

            // Update the sort indexes in the backend, starting from 1
            CourseEditorService.editCourseUpdateStageSortIndexes(moduleEditData.id, newOrder.map((item, index) => ({
                id: item.id,
                sort_index: index + 1 // Start index from 1 instead of 0
            })));

            return newOrder;
        });
    }
};
    const Dot = ({ tech, isActive }) => {
        const activeClass = isActive ? "active" : "";
        return (
            <div
                className={`dot ${activeClass}`}
                onClick={() => handleSelectStage(tech)}
            >
                {tech.type === "video" && (
                    <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />
                )}
                {tech.type === "classic" && (
                    <FontAwesomeIcon
                        icon={faChalkboardUser}
                        transform="down-6 grow-3"
                    />
                )}
                {tech.type === "quiz" && (
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        transform="down-6 grow-3"
                    />
                )}
                {!["video", "classic", "quiz"].includes(tech.type) && (
                    <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />
                )}
            </div>
        );
    };

    return (
        <>
            <LmsModalBase
                open={openModal}
                onClose={handleCloseModal}
                content={contentToModal}
            />
            <ModulePopupMenu
                course_id={course_id}
                moduleEditData={moduleEditData}
                setModuleEditData={setModuleEditData}
                handlePopupOpen={handlePopupOpen}
                handlePopupClose={handlePopupClose}
            />
            <div className="main__nav-block">
                <p>
                    Вы перешли на страницу редактирования модуля: "
                    {moduleEditData.title}"
                </p>
                <div className="nav-block__popup-menu">
                    <button
                        className="popup-menu__button"
                        onClick={showPopupMenu}
                    >
                        <SettingOutlined style={{ fontSize: "24px" }} />
                    </button>
                </div>
                <div className="nav-block__stages">
                    {moduleData.length < 20 && (
                        <div className="stages__add">
                            <LmsButton
                                buttonText={"Добавить урок"}
                                handleClick={addStage}
                            />
                        </div>
                    )}
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToHorizontalAxis]} // Restrict dragging to horizontal axis
                    >
                        <SortableContext
                            items={moduleData.map((item) => item.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            <div className="stages__case">
                                {moduleData.map((tech) => (
                                    <SortableItem
                                        key={tech.id}
                                        tech={tech}
                                        DotComponent={Dot}
                                        isActive={
                                            selectedStage &&
                                            tech.id === selectedStage.id
                                        }
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            {selectedStage && (
                <div className="main__content">
                    <div className="content__mini-menu">
                        <LmsButton
                            buttonText={"Удалить урок"}
                            handleClick={deleteStage}
                        />
                    </div>
                    {selectedStage.type === "classic" && (
                        <AddingClassicLesson selectedStage={selectedStage} />
                    )}
                    {selectedStage.type === "video" && (
                        <AddingVideoLesson selectedStage={selectedStage} />
                    )}
                    {selectedStage.type === "quiz" && (
                        <AddingQuizLesson selectedStage={selectedStage} />
                    )}
                </div>
            )}
        </>
    );
}

export default EditModuleStage;
