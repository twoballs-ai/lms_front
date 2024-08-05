import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
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
import LmsButton from "../../../../../reUseComponents/Button";
import EditModuleStage from "../../FullCourseEdit/EditModuleStage";
import CourseEditorService from "../../../../../../services/course.editor.service";
import SortableChapter from "./SortableChapter";
import LmsModalBase from "../../../../../reUseComponents/ModalBase";
import TextInput from "../../../../../reUseComponents/TextInput";
import SortableModules from "./SortableModules";
import ReusableSwitch from "../../../../../reUseComponents/Switcher";
import ReusableSliderWithInput from "../../../../../reUseComponents/Slider";

import { useDispatch, useSelector } from 'react-redux';
import { addChapter, fetchChapters } from "../../../../../../store/slices/courseEditorChapterSlice";
import AddChapterToCourse from "./AddChapterToCourse";

const getSortedChapters = (chapters) => {
    return [...chapters].sort((a, b) => a.sort_index - b.sort_index);
};

function CourseEditor() {
    const { course_id } = useParams();
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля
    const [openModal, setOpenModal] = useState(false);
    const [sortIndex, setSortIndex] = useState(1);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { chapters, status, error } = useSelector((state) => state.course);

    const handleBackToProfile = async () => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/teacher-profile`); // Замените '/новый_маршрут' на ваш адрес назначения
    };

    useEffect(() => {
        if (chapters.length > 0) {
            const maxSortIndex = Math.max(...chapters.map(chapter => chapter.sort_index));
            setSortIndex(maxSortIndex + 1);
        } else {
            setSortIndex(1);
        }
    }, [chapters]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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
        if (course_id) {
            dispatch(fetchChapters(course_id));
        }
    }, [course_id, dispatch]);

    const handleMoveModule = async (chapterId, moduleId, direction) => {
        const updatedChapters = chapters.map((chapter) => {
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

    const sortedChapters = getSortedChapters(chapters);

    return (
        <div className="course-edit__container">
            <LmsModalBase
                open={openModal}
                onClose={handleCloseModal}
                content={
                    <AddChapterToCourse
                    course_id={course_id}
                    handleCloseModal={handleCloseModal}
                    sortIndex={sortIndex}
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
                                    chapters={chapters}
                                    
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
