"use client"; // This directive must be at the top
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    DragStartEvent,
    DragMoveEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./CourseEditor.scss";
import LmsButton from "@/components/reUseComponents/LmsButton";
import EditModuleStage from "@/components/CourseEditorComponents/FullCourseEdit/EditModuleStage";
import SortableChapter from "@/components/CourseEditorComponents/LeftBar/SortableChapter";
import LmsModalBase from "@/components/reUseComponents/ModalBase";
import AddChapterToCourse from "@/components/CourseEditorComponents/LeftBar/utils/AddChapterToCourse";

import { useDispatch, useSelector } from "react-redux";
import {
    fetchChapters,
    updateChaptersSortIndexes,
} from "@/store/slices/courseEditorChapterSlice";
import { AppDispatch } from "@/store/store";

// Define Chapter and CourseState types
interface Chapter {
    id: string;
    sort_index: number;
    // Add any other properties of the chapter here
}

interface CourseState {
    chapters: Chapter[];
}

const CourseEditor: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const course_id = params.id as string;

    const [moduleEditData, setModuleEditData] = useState<Chapter[]>([]);
    const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

    const dispatch: AppDispatch = useDispatch(); 
    const courseChapters = useSelector(
        (state: { courseEditor: CourseState }) => state.courseEditor.chapters
    );

    const handleBackToProfile = async () => {
        router.push(`/teacher-profile/dashboard`);
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

    const handleDragStart = (event: DragStartEvent) => {
        setDraggingItemId(event.active.id.toString()); // Set the dragging item's id
    };

    const handleDragMove = (event: DragMoveEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            // Optionally add visual feedback here
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setDraggingItemId(null); // Reset dragging item on drag end
        const { active, over } = event;

        if (active.id !== over?.id && courseChapters) {
            const sortedChaptersCopy = [...courseChapters];
            const activeIndex = sortedChaptersCopy.findIndex(
                (chapter) => chapter.sort_index === Number(active.id)
            );
            const overIndex = sortedChaptersCopy.findIndex(
                (chapter) => chapter.sort_index === Number(over?.id)
            );

            const [removed] = sortedChaptersCopy.splice(activeIndex, 1);
            sortedChaptersCopy.splice(overIndex, 0, removed);

            const updatedChapters = sortedChaptersCopy.map((chapter, index) => ({
                ...chapter,
                sort_index: index + 1,
            }));

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

    const moveChapter = (chapterId: string, direction: "up" | "down") => {
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
                    items={courseChapters.map((chapter) => chapter.sort_index.toString())}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="container__leftbar">
                        <div className="leftbar__chapters">
                            <LmsButton
                            
                                buttonText={"Добавить раздел"}
                                handleClick={handleOpenModal}
                            />
                            {courseChapters.map((chapter) => (
                                <SortableChapter
                                    id={chapter.sort_index.toString()}
                                    key={chapter.id}
                                    chapter={chapter}
                                    course_id={course_id}
                                    setModuleEditData={setModuleEditData}
                                    setDraggingItemId={setDraggingItemId}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={setActiveChapterId}
                                    moveChapter={moveChapter}
                                    courseChapters={courseChapters}
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
};

export default CourseEditor;

// "use client"; // This directive must be at the top
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Correct useRouter import for app directory
// import { useParams } from "next/navigation"; // Fetch params using useParams from next/navigation
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import {
//     DndContext,
//     KeyboardSensor,
//     PointerSensor,
//     closestCorners,
//     useSensor,
//     useSensors,
// } from "@dnd-kit/core";
// import {
//     SortableContext,
//     sortableKeyboardCoordinates,
//     verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import LmsButton from "@/components/reUseComponents/Button";
// import EditModuleStage from "@/components/CourseEditorComponents/FullCourseEdit/EditModuleStage";
// import SortableChapter from "@/components/CourseEditorComponents/LeftBar/SortableChapter";
// import LmsModalBase from "@/components/reUseComponents/ModalBase";
// import AddChapterToCourse from "@/components/CourseEditorComponents/LeftBar/utils/AddChapterToCourse";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchChapters,
//     updateChaptersSortIndexes,
// } from "@/store/slices/courseEditorChapterSlice";
// import "./CourseEditor.scss";
// import {
//     DragEndEvent,
//     DragMoveEvent,
// } from '@dnd-kit/core';
// import { AppDispatch } from "@/store/store";
// interface Chapter {
//     id: string;
//     sort_index: number;

// }

// interface CourseState {
//     chapters: Chapter[];
// }

// const CourseEditor: React.FC = () => {
//     const router = useRouter();
//     const params = useParams();
//     const course_id = params.id as string | number; // Ensure course_id is a string

//     const [moduleEditData, setModuleEditData] = useState([]);
//     const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
//     const [openModal, setOpenModal] = useState(false);

//     const dispatch: AppDispatch = useDispatch(); 
//     const courseChapters = useSelector(
//         (state: { courseEditor: CourseState }) => state.courseEditor.chapters
//     );

//     const handleBackToProfile = async () => {
//         router.push(`/teacher-profile/dashboard`);
//     };

//     useEffect(() => {
//         if (course_id) {
//             dispatch(fetchChapters(Number(course_id)));
//         }
//     }, [course_id, dispatch]);

//     const handleOpenModal = () => setOpenModal(true);
//     const handleCloseModal = () => setOpenModal(false);

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(KeyboardSensor, {
//             coordinateGetter: sortableKeyboardCoordinates,
//         })
//     );

//     const handleDragMove = (event: DragMoveEvent) => {
//         const { active, over } = event;
        
//         if (active.id !== over?.id) {
//             // Optionally add visual feedback
//         }
//     };

//     const handleDragEnd = (event: DragEndEvent) => {
//         const { active, over } = event;
//         console.log(event)
//         if (active.id !== over?.id && courseChapters) {
//             const sortedChaptersCopy = [...courseChapters];
//             const activeIndex = sortedChaptersCopy.findIndex(
//                 (chapter) => chapter.sort_index === active.id
//             );
//             const overIndex = sortedChaptersCopy.findIndex(
//                 (chapter) => chapter.sort_index === over.id
//             );

//             const [removed] = sortedChaptersCopy.splice(activeIndex, 1);
//             sortedChaptersCopy.splice(overIndex, 0, removed);

//             const updatedChapters = sortedChaptersCopy.map((chapter, index) => ({
//                 ...chapter,
//                 sort_index: index + 1,
//             }));

//             dispatch(
//                 updateChaptersSortIndexes({
//                     course_id,
//                     chapters: updatedChapters.map((chapter) => ({
//                         id: chapter.id,
//                         sort_index: chapter.sort_index,
//                     })),
//                 })
//             ).then(() => {
//                 dispatch(fetchChapters(course_id));
//             });
//         }
//     };

//     const moveChapter = (chapterId: string, direction: "up" | "down") => {
//         const currentIndex = courseChapters.findIndex(
//             (chapter) => chapter.id === chapterId
//         );
//         const newIndex =
//             direction === "up" ? currentIndex - 1 : currentIndex + 1;

//         if (newIndex < 0 || newIndex >= courseChapters.length) return;

//         const updatedChapters = [...courseChapters];
//         const [movedChapter] = updatedChapters.splice(currentIndex, 1);
//         updatedChapters.splice(newIndex, 0, movedChapter);

//         const updatedChaptersWithIndex = updatedChapters.map(
//             (chapter, index) => ({
//                 ...chapter,
//                 sort_index: index + 1,
//             })
//         );

//         dispatch(
//             updateChaptersSortIndexes({
//                 course_id,
//                 chapters: updatedChaptersWithIndex.map((chapter) => ({
//                     id: chapter.id,
//                     sort_index: chapter.sort_index,
//                 })),
//             })
//         ).then(() => {
//             dispatch(fetchChapters(course_id));
//         });
//     };

//     const sortedChapters = courseChapters
//         .map((chapter) => ({
//             ...chapter,
//             modules: chapter.modules.slice().sort((a, b) => a.sort_index - b.sort_index),
//         }))
//         .slice()
//         .sort((a, b) => a.sort_index - b.sort_index);

//     return (
//         <div className="course-edit__container">
//             <LmsModalBase
//                 open={openModal}
//                 onClose={handleCloseModal}
//                 content={
//                     <AddChapterToCourse
//                         course_id={course_id}
//                         handleCloseModal={handleCloseModal}
//                     />
//                 }
//             />
//             <DndContext
//                 sensors={sensors}
//                 collisionDetection={closestCorners}
//                 onDragEnd={handleDragEnd}
//                 onDragMove={handleDragMove}
//                 modifiers={[restrictToVerticalAxis]}
//             >
                
//                 <SortableContext
//                     items={sortedChapters.map((chapter) => chapter.sort_index)}
//                     strategy={verticalListSortingStrategy} 
//                 >
//                     <div className="container__leftbar">
//                         <div className="leftbar__chapters">
//                             <LmsButton
//                                 buttonText={"Добавить раздел"}
//                                 handleClick={handleOpenModal}
//                             />
//                             {sortedChapters.map((chapter) => (
//                                 <SortableChapter
//                                     id={chapter.sort_index.toString()}
//                                     key={chapter.sort_index}
//                                     chapter={chapter}
//                                     course_id={course_id}
//                                     setModuleEditData={setModuleEditData}
//                                     activeChapterId={activeChapterId}
//                                     setActiveChapterId={setActiveChapterId}
//                                     moveChapter={moveChapter}
//                                     courseChapters={sortedChapters}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </SortableContext>
//             </DndContext>
//             <div className="container__main">
//                 {Object.keys(moduleEditData).length > 0 && (
//                     <EditModuleStage
//                         course_id={course_id}
//                         moduleEditData={moduleEditData}
//                         setModuleEditData={setModuleEditData}
//                     />
//                 )}
//             </div>
//             <div className="settings-panel">
//                 <LmsButton
//                     buttonText={"Вернуться в профиль"}
//                     handleClick={handleBackToProfile}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CourseEditor;
