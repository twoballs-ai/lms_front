"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Используем useRouter вместо useNavigate
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./CourseEditor.scss";
import LmsButton from "@/components/reUseComponents/Button";
import EditModuleStage from "@/components/CourseEditorComponents/FullCourseEdit/EditModuleStage";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchChapters,
    updateChaptersSortIndexes,
    updateModulesSortIndexes,
} from "../../../store/slices/courseEditorChapterSlice";
import SortableChapter from "@/components/CourseEditorComponents/components/LeftBar/SortableChapter";
import LmsModalBase from "@/components/reUseComponents/ModalBase";
import AddChapterToCourse from "@/components/CourseEditorComponents/components/LeftBar/utils/AddChapterToCourse";
import SortableModules from "@/components/CourseEditorComponents/components/LeftBar/SortableModules";

// Define types
interface Module {
    id: string;
    title: string;
    sort_index: number;
}

interface Chapter {
    id: string;
    title: string;
    sort_index: number;
    modules: Module[];
}

interface CourseState {
    chapters: Chapter[];
}

const CourseEditor: React.FC = () => {
    const [moduleEditData, setModuleEditData] = useState([]);

    // const [moduleEditData, setModuleEditData] = useState<Module | null>(null);
    const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

    const router = useRouter();
    const dispatch = useDispatch();
    const courseChapters = useSelector((state: { courseEditor: CourseState }) => state.courseEditor.chapters);


    // Get course_id from the URL using useRouter hook
    const params = useParams();
    const course_id = params.id; // Получение course_id через useParams Next.js

    const handleBackToProfile = () => {
        router.push(`/teacher-profile`);
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
};

export default CourseEditor;
