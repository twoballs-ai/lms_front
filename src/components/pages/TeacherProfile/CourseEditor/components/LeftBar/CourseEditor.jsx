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
    updateModulesSortIndexes,
} from "../../../../../../store/slices/courseEditorChapterSlice";
import SortableModules from "./SortableModules";

function CourseEditor() {
    const { course_id } = useParams();
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [draggingItemId, setDraggingItemId] = useState(null); // New state for dragging item
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

    const handleDragStart = (event) => {
        setDraggingItemId(event.active.id); // Set the dragging item's id
        // Optionally add a class or styling to indicate the drag start
    };

    const handleDragMove = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            // Optionally add visual feedback here
            // For example: highlight the target position
        }
    };

    const handleDragEnd = (event) => {
        setDraggingItemId(null); // Reset dragging item on drag end
        const { active, over } = event;

        if (active.id !== over?.id && courseChapters) {
            const sortedChaptersCopy = [...courseChapters];
            const activeIndex = sortedChaptersCopy.findIndex(
                (chapter) => chapter.sort_index === active.id
            );
            const overIndex = sortedChaptersCopy.findIndex(
                (chapter) => chapter.sort_index === over.id
            );

            const [removed] = sortedChaptersCopy.splice(activeIndex, 1);
            sortedChaptersCopy.splice(overIndex, 0, removed);

            const updatedChapters = sortedChaptersCopy.map(
                (chapter, index) => ({
                    ...chapter,
                    sort_index: index + 1,
                })
            );

            // Debugging output
            console.log("Updated chapters:", updatedChapters);

            dispatch(
                updateChaptersSortIndexes({
                    course_id,
                    chapters: updatedChapters.map((chapter) => ({
                        id: chapter.id,
                        sort_index: chapter.sort_index,
                    })),
                })
            ).then(() => {
                dispatch(fetchChapters(course_id));
            });
        } else {
            console.error("courseChapters is undefined or invalid");
        }
    };
    const moveChapter = (chapterId, direction) => {
        const currentIndex = courseChapters.findIndex(
            (chapter) => chapter.id === chapterId
        );
        const newIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= courseChapters.length) return;

        const updatedChapters = [...courseChapters];
        const [movedChapter] = updatedChapters.splice(currentIndex, 1);
        updatedChapters.splice(newIndex, 0, movedChapter);

        const updatedChaptersWithIndex = updatedChapters.map(
            (chapter, index) => ({
                ...chapter,
                sort_index: index + 1,
            })
        );

        dispatch(
            updateChaptersSortIndexes({
                course_id,
                chapters: updatedChaptersWithIndex.map((chapter) => ({
                    id: chapter.id,
                    sort_index: chapter.sort_index,
                })),
            })
        ).then(() => {
            dispatch(fetchChapters(course_id));
        });
    };

    const handleMoveModule = async (chapterId, moduleId, direction) => {
        const chapterIndex = courseChapters.findIndex((chapter) => chapter.id === chapterId);
        if (chapterIndex === -1) return;
    
        // Create a new array for the chapters
        const updatedChapters = [...courseChapters];
        const modules = [...updatedChapters[chapterIndex].modules];
        const moduleIndex = modules.findIndex((module) => module.id === moduleId);
    
        const newIndex = moduleIndex + direction;
    
        if (newIndex < 0 || newIndex >= modules.length) return;
    
        // Create a new array for modules and move the module
        const newModules = [...modules];
        const [movedModule] = newModules.splice(moduleIndex, 1);
        newModules.splice(newIndex, 0, movedModule);
    
        // Update the modules in the specific chapter
        updatedChapters[chapterIndex] = {
            ...updatedChapters[chapterIndex],
            modules: newModules.map((module, idx) => ({
                ...module,
                sort_index: idx + 1,
            })),
        };
    
        // Update the state to trigger a re-render
        dispatch(updateModulesSortIndexes({
            chapter_id: chapterId,
            modules: updatedChapters[chapterIndex].modules.map(module => ({
                id: module.id,
                sort_index: module.sort_index,
            })),
        })).then(() => {
            // Directly update the frontend state with the new order
            dispatch(fetchChapters(course_id));  // Refresh the chapters from the backend
        }).catch(error => {
            console.error("Failed to update module sort indexes:", error);
        });
    };
    const handleModuleDragEnd = (event, chapterId) => {
        setDraggingItemId(null);
        const { active, over } = event;
        const chapterIndex = courseChapters.findIndex((chapter) => chapter.id === chapterId);
        
        if (chapterIndex === -1 || !over) return;
        
        const modules = [...courseChapters[chapterIndex].modules];
        const activeIndex = modules.findIndex((module) => module.sort_index === active.id);
        const overIndex = modules.findIndex((module) => module.sort_index === over.id);
        
        if (activeIndex !== overIndex) {
            const [removedModule] = modules.splice(activeIndex, 1);
            modules.splice(overIndex, 0, removedModule);

            const updatedModules = modules.map((module, idx) => ({
                ...module,
                sort_index: idx + 1,
            }));

            dispatch(updateModulesSortIndexes({
                chapter_id: chapterId,
                modules: updatedModules.map(module => ({
                    id: module.id,
                    sort_index: module.sort_index,
                })),
            })).then(() => {
                dispatch(fetchChapters(course_id));
            }).catch(error => {
                console.error("Failed to update module sort indexes:", error);
            });
        }
    };

    const sortedChapters = courseChapters
        .map((chapter) => ({
            ...chapter,
            modules: chapter.modules
                .slice()
                .sort((a, b) => a.sort_index - b.sort_index),
        }))
        .slice()
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
                onDragStart={handleDragStart} // Added handleDragStart
                onDragMove={handleDragMove} // Added handleDragMove
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
                                    moveChapter={moveChapter}
                                    courseChapters={sortedChapters}
                                >
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCorners}
                                        modifiers={[restrictToVerticalAxis]}
                                        onDragEnd={(event) => handleModuleDragEnd(event, chapter.id)}

                                    >
                                        <SortableContext
                                            items={chapter.modules.map(
                                                (module) => module.sort_index
                                            )}
                                            strategy={
                                                verticalListSortingStrategy
                                            }
                                        >
                                            {chapter.modules
                                                .slice()
                                                .sort(
                                                    (a, b) =>
                                                        a.sort_index -
                                                        b.sort_index
                                                )
                                                .map((module, index) => (
                                                    <SortableModules
                                                        title={module.title}
                                                        moduleChange={
                                                            moduleChange
                                                        }
                                                        id={module.sort_index}
                                                        key={module.sort_index}
                                                        module={module}
                                                        activeModuleId={
                                                            activeModuleId
                                                        }
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
                                                        isFirst={index === 0} // First module in the list
                                                        isLast={
                                                            index ===
                                                            chapter.modules
                                                                .length -
                                                                1
                                                        } // Last module in the list
                                                    />
                                                ))}
                                        </SortableContext>
                                    </DndContext>
                                </SortableChapter>
                            ))}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
            <div className="container__main">
                {Object.keys(moduleEditData).length > 0 && (
                    <EditModuleStage
                        course_id={course_id}
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
