"use client"; // This directive must be at the top
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct useRouter import for app directory
import { useParams } from "next/navigation"; // Fetch params using useParams from next/navigation
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
import LmsButton from "@/components/reUseComponents/Button";
import EditModuleStage from "@/components/CourseEditorComponents/FullCourseEdit/EditModuleStage";
import SortableChapter from "@/components/CourseEditorComponents/LeftBar/SortableChapter";
import LmsModalBase from "@/components/reUseComponents/ModalBase";
import AddChapterToCourse from "@/components/CourseEditorComponents/LeftBar/utils/AddChapterToCourse";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchChapters,
    updateChaptersSortIndexes,
    updateModulesSortIndexes,
} from "@/store/slices/courseEditorChapterSlice";
import "./CourseEditor.scss";

function CourseEditor() {
    const router = useRouter(); // Correct usage
    const params = useParams();
    const course_id = params.id; // Getting course_id from dynamic params
    
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [draggingItemId, setDraggingItemId] = useState(null); // State for dragging item

    const dispatch = useDispatch();
    const courseChapters = useSelector((state: { courseEditor: CourseState }) => state.courseEditor.chapters);

    const handleBackToProfile = async () => {
        router.push(`/teacher-profile`); // Using router.push for navigation
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


    const handleDragStart = (event) => {
        setDraggingItemId(event.active.id);
    };

    const handleDragMove = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            // Optionally add visual feedback
        }
    };

    const handleDragEnd = (event) => {
        setDraggingItemId(null);
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
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
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
                                    course_id={course_id}
                                    setModuleEditData={setModuleEditData}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={setActiveChapterId}
                                    setDraggingItemId={setDraggingItemId}
                                    moveChapter={moveChapter}
                                    courseChapters={sortedChapters}
                                />
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
