import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
    DndContext,
    // DragMoveEvent,
    // DragOverlay,
    // DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    // UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
// import { DragEndEvent } from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import {SortableItem} from './SortableItem';
// import LeftBar from "./LeftBar";
import "./CourseEditor.scss";
import { apiLmsUrl } from "../../../../../../shared/config";
import LmsButton from "../../../../../reUseComponents/Button";
import EditModuleStage from "../../FullCourseEdit/EditModuleStage";
import CourseEditorService from "../../../../../../services/course.editor.service";
import SortableChapter from "./SortableChapter";
import LmsModalBase from "../../../../../reUseComponents/ModalBase";
import TextInput from "../../../../../reUseComponents/TextInput";
import SortableModules from "./SortableModules";
import ReusableSwitch from "../../../../../reUseComponents/Switcher";
import ReusableSliderWithInput from "../../../../../reUseComponents/Slider";
import ChapterModalContent from "./ChapterModalContent";

function CourseEditor() {
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля''

    const [openModal, setOpenModal] = useState(false);

    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescreValue] = useState('');
    const [sortIndex, setSortIndex] = useState(1);
    const [isExam, setIsExam] = useState(false);
    const [examDuration, setExamDuration] = useState(10);
    const [previousChapterId, setPreviousChapterId] = useState(null)


    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);



    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };

    const handleInputDescrChange = (e) => {
        setInputDescreValue(e.target.value);
    };

    const handleSortIndexChange = (e) => {
        setSortIndex(e.target.value);
    };

    const handleIsExamChange = (checked) => {
        setIsExam(checked);
    };

    const handleExamDurationChange = (value) => {
        setExamDuration(value);
    };


    const handlePreviousChapterIdChange = (e) => {
        setPreviousChapterId(e.target.value);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Установите ось перемещения как вертикальную
            axis: "y",
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const moduleChange = (module) => {
        setModuleEditData(module);
    };


    const AddChapterOpenModal = async () => {
        handleOpenModal()
    };

    const handleDragStart = (event) => { };
    const handleDragMove = (event) => { };
    const handleDragEnd = (event) => { };

    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(
                course_id
            ).then((response) => {
                // console.log(response)
                if (response.status === 200 || response.status === 201) {
                    // console.log(response.data.data);
                    setGetChapters(response.data.data);
                }
            });
        };
        fetchData();
    }, [course_id]);

    const addChapter = async () => {
        let examDurationValue = isExam ? examDuration : null;

        const dataParams = {
            course_id: course_id,
            title: inputTitleValue,
            description: inputDescrValue,
            sort_index: sortIndex,
            is_exam: isExam,
            exam_duration_minutes: examDurationValue,
            previous_chapter_id: previousChapterId,
        };
    
        try {
            const response = await CourseEditorService.editCoursePageAddChapter(dataParams);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data)
                const newData = [...getChapters, response.data.chapter];
                setGetChapters(newData);
                handleCloseModal();
            }
        } catch (error) {
            console.error('Failed to add chapter:', error);
        }
    };

console.log(getChapters)


    return (
        <div className="course-edit__container">
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={<ChapterModalContent
            inputTitleValue={inputTitleValue}
            inputDescrValue={inputDescrValue}
            isExam={isExam}
            examDuration={examDuration}
            handleInputChange={handleInputChange}
            handleInputDescrChange={handleInputDescrChange}
            handleIsExamChange={handleIsExamChange}
            handleExamDurationChange={handleExamDurationChange}
            addChapter={addChapter}
        />} />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={getChapters.map((chapter) => chapter.id)}
                    // items={getChapters.map((chapter) => chapter.sort_index)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="container__leftbar">
                        <div className="leftbar__chapters">
                            <LmsButton
                                buttonText={"Добавить раздел"}
                                handleClick={AddChapterOpenModal}
                            />
                            {getChapters.map((chapter) => (
                                <SortableChapter
                                    id={chapter.sort_index}
                                    // key={chapter.sort_index} // Убедитесь, что уникальный ключ присутствует
                                    key={chapter.id}
                                    chapter={chapter}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={setActiveChapterId}

                                    getChapters={getChapters}
                                    setGetChapters={setGetChapters}
                                >
                                    <SortableContext items={chapter.modules.map((i) => i.id)}>

                                        {chapter.modules.map((module) => (
                                            // <div
                                            //     key={module.id}
                                            //     className={`modules__block ${activeModuleId === module.id ? "active" : ""}`}
                                            //     onClick={() => {
                                            //         setActiveModuleId(module.id);
                                            //         moduleChange(module);
                                            //     }}
                                            // >
                                            //     {module.title}
                                            // </div>
                                            <SortableModules
                                                title={module.title}
                                                moduleChange={moduleChange}
                                                id={module.id}
                                                key={module.id}
                                                module={module}
                                                activeModuleId={activeModuleId}
                                                setActiveModuleId={setActiveModuleId} />
                                        ))}

                                    </SortableContext>
                                </SortableChapter>
                            ))}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
            <div className="container__main">
                {Object.keys(moduleEditData).length > 0 && (
                    <EditModuleStage moduleEditData={moduleEditData} />
                )}
            </div>
        </div>
    );
}

export default CourseEditor;
