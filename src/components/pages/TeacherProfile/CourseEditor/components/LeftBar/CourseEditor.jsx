import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
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
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./CourseEditor.scss";
import LmsButton from "../../../../../reUseComponents/Button";
import EditModuleStage from "../../FullCourseEdit/EditModuleStage";
import CourseEditorService from "../../../../../../services/course.editor.service";
import SortableChapter from "./SortableChapter";
import LmsModalBase from "../../../../../reUseComponents/ModalBase";
import AddChapterToCourse from "./utils/AddChapterToCourse";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchChapters,
    updateChaptersSortIndexes,
} from "../../../../../../store/slices/courseEditorChapterSlice";

function CourseEditor() {
    const { course_id } = useParams();
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const courseChapters = useSelector((state) => state.course.chapters);

    const handleBackToProfile = async () => {
        navigate(`/teacher-profile`);
    };

    useEffect(() => {
        if (course_id) {
            dispatch(fetchChapters(course_id));
        }
    }, [course_id, dispatch]);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            axis: "y",
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const moduleChange = (module) => {
        setModuleEditData(module);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (active.id !== over.id && courseChapters) {
            // Create a copy of the sorted chapters
            const sortedChaptersCopy = [...sortedChapters];
            const activeIndex = sortedChaptersCopy.findIndex(chapter => chapter.sort_index === active.id);
            const overIndex = sortedChaptersCopy.findIndex(chapter => chapter.sort_index === over.id);
    
            // Remove the active item from its original position
            const [removed] = sortedChaptersCopy.splice(activeIndex, 1);
            
            // Insert the removed item at the new position
            sortedChaptersCopy.splice(overIndex, 0, removed);
    
            // Update sort_index based on new positions
            const updatedChapters = sortedChaptersCopy.map((chapter, index) => ({
                ...chapter,
                sort_index: index + 1,
            }));
    
            // Dispatch actions to update the backend
            dispatch(
                updateChaptersSortIndexes({
                    course_id,
                    chapters: updatedChapters.map((chapter) => ({
                        id: chapter.id,
                        sort_index: chapter.sort_index,
                    })),
                })
            );
    
            // Optionally refresh chapters from the server
            dispatch(fetchChapters(course_id));
        } else {
            console.error('courseChapters is undefined or invalid');
        }
    };
    

    const handleMoveModule = async (chapterId, moduleId, direction) => {
        const updatedChapters = courseChapters.map((chapter) => {
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

        // Обновляем состояние в Redux и отправляем обновления на сервер
        try {
            dispatch(fetchChapters(course_id)); // Сбросить состояние или заново загрузить главы

            updatedChapters.forEach((chapter) => {
                chapter.modules.forEach(async (module) => {
                    try {
                        await CourseEditorService.editCoursePagePatchModule(
                            module.id,
                            {
                                sort_index: module.sort_index,
                            }
                        );
                    } catch (error) {
                        console.error("Failed to update module:", error);
                    }
                });
            });
        } catch (error) {
            console.error("Failed to update chapter sort indexes:", error);
        }
    };
console.log(courseChapters)
    const sortedChapters = courseChapters
        .map((chapter) => ({
            ...chapter,
            modules: chapter.modules.sort(
                (a, b) => a.sort_index - b.sort_index
            ),
        }))
        .sort((a, b) => a.sort_index - b.sort_index);

    return (
        <div className="course-edit__container">
            <LmsModalBase
                open={openModal}
                onClose={handleCloseModal}
                content={
                    <AddChapterToCourse
                        course_id={course_id}
                        handleCloseModal={handleCloseModal}
                    />
                }
            />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
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
                                handleClick={handleOpenModal}
                            />
                            {sortedChapters.map((chapter) => (
                                <SortableChapter
                                    id={chapter.sort_index}
                                    key={chapter.sort_index}
                                    chapter={chapter}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={setActiveChapterId}
                                >
                                    <SortableContext
                                        items={chapter.modules.map((i) => i.id)}
                                    >
                                        {chapter.modules.map((module) => (
                                            <SortableModules
                                                title={module.title}
                                                moduleChange={moduleChange}
                                                id={module.id}
                                                key={module.sort_index}
                                                module={module}
                                                activeModuleId={activeModuleId}
                                                setActiveModuleId={
                                                    setActiveModuleId
                                                }
                                                onMoveUp={() =>
                                                    handleMoveModule(
                                                        chapter.id,
                                                        module.id,
                                                        -1
                                                    )
                                                }
                                                onMoveDown={() =>
                                                    handleMoveModule(
                                                        chapter.id,
                                                        module.id,
                                                        1
                                                    )
                                                }
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
            </div>
        </div>
    );
}

export default CourseEditor;
