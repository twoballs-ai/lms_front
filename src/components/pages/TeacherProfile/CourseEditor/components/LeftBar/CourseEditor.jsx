import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
import { useLocation, useNavigate } from 'react-router-dom';
function CourseEditor() {
    
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля

    const [openModal, setOpenModal] = useState(false);

    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescreValue] = useState('');
    const [sortIndex, setSortIndex] = useState(1);
    const [isExam, setIsExam] = useState(false);
    const [examDuration, setExamDuration] = useState(10);
    const [previousChapterId, setPreviousChapterId] = useState(null);

    const navigate = useNavigate();


    const handleBackToProfile = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/teacher-profile`); // Замените '/новый_маршрут' на ваш адрес назначения
    };


    useEffect(() => {
        if (getChapters.length > 0) {
            const maxSortIndex = Math.max(...getChapters.map(chapter => chapter.sort_index));
            setSortIndex(maxSortIndex + 1);
        } else {
            setSortIndex(1);
        }
    }, [getChapters]);

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
        handleOpenModal();
    };

    const handleDragStart = (event) => {};
    const handleDragMove = (event) => {};
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setGetChapters((chapters) => {
                const oldIndex = chapters.findIndex((chapter) => chapter.sort_index === active.id);
                const newIndex = chapters.findIndex((chapter) => chapter.sort_index === over.id);
                const newChapters = arrayMove(chapters, oldIndex, newIndex).map((chapter, index) => ({
                    ...chapter,
                    sort_index: index + 1,
                }));
                // Обновление сортировки на сервере
                newChapters.forEach(async (chapter) => {
                    try {
                        const response = await CourseEditorService.editCoursePageUpdateChapter(chapter.id, {
                            sort_index: chapter.sort_index,
                        });
                        if (response.status === 200 || response.status === 201) {
                            console.log("Chapter updated successfully", response.data);
                        }
                    } catch (error) {
                        console.error('Failed to update chapter:', error);
                    }
                });
                return newChapters;
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(course_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    // Sort the modules within each chapter by sort_index
                    const sortedChapters = response.data.data.map(chapter => {
                        const sortedModules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                        return { ...chapter, modules: sortedModules };
                    });
                    setGetChapters(sortedChapters);
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
                console.log(response.data);
                const newData = [...getChapters, response.data.data];
                setGetChapters(newData);
                handleCloseModal();
            }
        } catch (error) {
            console.error('Failed to add chapter:', error);
        }
    };

    const handleMoveModule = async (chapterId, moduleId, direction) => {
        const updatedChapters = getChapters.map((chapter) => {
            if (chapter.id !== chapterId) return chapter;

            const modules = [...chapter.modules];
            const index = modules.findIndex((module) => module.id === moduleId);
            const newIndex = index + direction;

            if (newIndex < 0 || newIndex >= modules.length) return chapter;

            const [movedModule] = modules.splice(index, 1);
            modules.splice(newIndex, 0, movedModule);

            return {
                ...chapter,
                modules: modules.map((module, idx) => ({
                    ...module,
                    sort_index: idx + 1,
                })),
            };
        });

        setGetChapters(updatedChapters);

        // Обновление сортировки модулей на сервере
        updatedChapters.forEach((chapter) => {
            chapter.modules.forEach(async (module) => {
                try {
                    const response = await CourseEditorService.editCoursePagePatchModule(module.id, {
                        sort_index: module.sort_index,
                    });
                    if (response.status === 200 || response.status === 201) {
                        console.log("Module updated successfully", response.data);
                    }
                } catch (error) {
                    console.error('Failed to update module:', error);
                }
            });
        });
    };

    const sortedChapters = [...getChapters].sort((a, b) => a.sort_index - b.sort_index);
console.log(sortedChapters)
    return (
        <div className="course-edit__container">
            <LmsModalBase
                open={openModal}
                onClose={handleCloseModal}
                content={
                    <ChapterModalContent
                        inputTitleValue={inputTitleValue}
                        inputDescrValue={inputDescrValue}
                        isExam={isExam}
                        examDuration={examDuration}
                        handleInputChange={handleInputChange}
                        handleInputDescrChange={handleInputDescrChange}
                        handleIsExamChange={handleIsExamChange}
                        handleExamDurationChange={handleExamDurationChange}
                        addChapter={addChapter}
                    />
                }
            />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={sortedChapters.map((chapter) => chapter.sort_index)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="container__leftbar">
                        <div className="leftbar__chapters">
                            <LmsButton
                                buttonText={"Добавить раздел"}
                                handleClick={AddChapterOpenModal}
                            />
                            {sortedChapters.map((chapter) => (
                                <SortableChapter
                                    id={chapter.sort_index}
                                    key={chapter.sort_index}
                                    chapter={chapter}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={setActiveChapterId}
                                    getChapters={getChapters}
                                    setGetChapters={setGetChapters}
                                >
                                    <SortableContext items={chapter.modules.map((i) => i.id)}>
                                        {chapter.modules.map((module, index) => (
                                            <SortableModules
                                                title={module.title}
                                                moduleChange={moduleChange}
                                                id={module.id}
                                                key={module.sort_index}
                                                module={module}
                                                activeModuleId={activeModuleId}
                                                setActiveModuleId={setActiveModuleId}
                                                onMoveUp={() => handleMoveModule(chapter.id, module.id, -1)}
                                                onMoveDown={() => handleMoveModule(chapter.id, module.id, 1)}
                                                isFirst={index === 0}
                                                isLast={index === chapter.modules.length - 1}
                                            />
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
                    <EditModuleStage
                        moduleEditData={moduleEditData}
                        setModuleEditData={setModuleEditData}
                        getChapters={getChapters}
                        setGetChapters={setGetChapters}
                    />
                )}
            </div>
            <div className="settings-panel">
            <LmsButton
                                buttonText={"Вернуться в профиль"}
                                handleClick={handleBackToProfile}
                            />
                {/* Здесь могут быть различные элементы управления настройками */}
            </div>
        </div>
    );
}

export default CourseEditor;
