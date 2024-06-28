// src/components/CourseEditor/CourseEditor.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import './CourseEditor.scss';
import { RootState, AppDispatch } from '../../../../../../store/store';
import LmsButton from '../../../../../reUseComponents/Button';
import EditModuleStage from '../../FullCourseEdit/EditModuleStage';
import {
    fetchChapters,
    addChapter,
    setModuleEditData,
    setActiveChapterId,
    setActiveModuleId,
    setModalOpen,
    setInputTitleValue,
    setInputDescrValue,
    setSortIndex,
    setIsExam,
    setExamDuration,
    setChapters, // Добавлено, чтобы можно было установить новые главы после сортировки
} from '../../../../../../store/slices/courseEditorSlice';
import SortableChapter from './SortableChapter';
import LmsModalBase from '../../../../../reUseComponents/ModalBase';
import TextInput from '../../../../../reUseComponents/TextInput';
import SortableModules from './SortableModules';
import ReusableSwitch from '../../../../../reUseComponents/Switcher';
import ReusableSliderWithInput from '../../../../../reUseComponents/Slider';
import ChapterModalContent from './ChapterModalContent';
import { useNavigate } from 'react-router-dom';
import IntellyButton from '@/components/reUseComponents/IntellyButton';
import Module from 'module';

const CourseEditor: React.FC = () => {
    const { course_id } = useParams<{ course_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {
        chapters,
        moduleEditData,
        activeChapterId,
        activeModuleId,
        isModalOpen,
        inputTitleValue,
        inputDescrValue,
        sortIndex,
        isExam,
        examDuration,
    } = useSelector((state: RootState) => state.courseEditor);

    // Получение данных при монтировании компонента
    useEffect(() => {
        if (course_id) {
            dispatch(fetchChapters(course_id));
        }
    }, [course_id, dispatch]);

    // Функция для навигации обратно к профилю учителя
    const handleBackToProfile = async () => {
        navigate(`/teacher-profile`);
    };

    // Функции для управления модальным окном
    const handleOpenModal = () => dispatch(setModalOpen(true));
    const handleCloseModal = () => dispatch(setModalOpen(false));

    // Функции для обработки изменений инпутов
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputTitleValue(e.target.value));
    };

    const handleInputDescrChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setInputDescrValue(e.target.value));
    };

    const handleIsExamChange = (checked: boolean) => {
        dispatch(setIsExam(checked));
    };

    const handleExamDurationChange = (value: number) => {
        dispatch(setExamDuration(value));
    };

    // Настройка сенсоров для DnD
    const sensors = useSensors(
        useSensor(PointerSensor, {
            axis: 'y',
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const moduleChange = (module: Module) => {
        dispatch(setModuleEditData(module));
    };

    const AddChapterOpenModal = async () => {
        handleOpenModal();
    };

    // Обработчики для начала и завершения перетаскивания
    const handleDragStart = (event: any) => {};
    const handleDragMove = (event: any) => {};
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = chapters.findIndex(chapter => chapter.sort_index === active.id);
            const newIndex = chapters.findIndex(chapter => chapter.sort_index === over?.id);
            const newChapters = arrayMove(chapters, oldIndex, newIndex).map((chapter, index) => ({
                ...chapter,
                sort_index: index + 1,
            }));
            newChapters.forEach(async chapter => {
                try {
                    const response = await CourseEditorService.editCoursePageUpdateChapter(chapter.id, {
                        sort_index: chapter.sort_index,
                    });
                    if (response.status === 200 || response.status === 201) {
                        console.log('Chapter updated successfully', response.data);
                    }
                } catch (error) {
                    console.error('Failed to update chapter:', error);
                }
            });
            dispatch(setChapters(newChapters));
        }
    };

    // Сортировка глав
    const sortedChapters = [...chapters].sort(
        (a, b) => a.sort_index - b.sort_index,
    );

    return (
        <div className="course-edit__container">
            <LmsModalBase
                open={isModalOpen}
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
                        addChapter={() => dispatch(addChapter({
                            course_id: course_id!,
                            title: inputTitleValue,
                            description: inputDescrValue,
                            sort_index: sortIndex,
                            is_exam: isExam,
                            exam_duration_minutes: isExam ? examDuration : null,
                        }))}
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
                    items={sortedChapters.map(chapter => chapter.sort_index)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="container__leftbar">
                        <div className="leftbar__chapters">
                            <IntellyButton
                                buttonText="Добавить раздел"
                                handleClick={AddChapterOpenModal}
                                styleType="primary"
                                showIcon={true}
                            />
                            {sortedChapters.map(chapter => (
                                <SortableChapter
                                    id={chapter.sort_index}
                                    key={chapter.sort_index}
                                    chapter={chapter}
                                    activeChapterId={activeChapterId}
                                    setActiveChapterId={(id) => dispatch(setActiveChapterId(id))}
                                    getChapters={chapters}
                                    setGetChapters={(chapters) => dispatch(setChapters(chapters))}
                                >
                                    <SortableContext
                                        items={chapter.modules.map(i => i.id)}
                                    >
                                        {chapter.modules.map(
                                            (module, index) => (
                                                <SortableModules
                                                    title={module.title}
                                                    moduleChange={moduleChange}
                                                    id={module.id}
                                                    key={module.sort_index}
                                                    module={module}
                                                    activeModuleId={activeModuleId}
                                                    setActiveModuleId={(id) => dispatch(setActiveModuleId(id))}
                                                    onMoveUp={() =>
                                                        handleMoveModule(
                                                            chapter.id,
                                                            module.id,
                                                            -1,
                                                        )
                                                    }
                                                    onMoveDown={() =>
                                                        handleMoveModule(
                                                            chapter.id,
                                                            module.id,
                                                            1,
                                                        )
                                                    }
                                                    isFirst={index === 0}
                                                    isLast={index === chapter.modules.length - 1}
                                                />
                                            ),
                                        )}
                                    </SortableContext>
                                </SortableChapter>
                            ))}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
            <div className="container__main">
                {moduleEditData && (
                    <EditModuleStage
                        moduleEditData={moduleEditData}
                        setModuleEditData={(module) => dispatch(setModuleEditData(module))}
                        getChapters={chapters}
                        setGetChapters={(chapters) => dispatch(setChapters(chapters))}
                    />
                )}
            </div>
            <div className="course-edit__footer">
                <Link to={`/teacher-profile`} className="course-edit__footer-item">
                    <LmsButton
                        title="Назад к профилю"
                        onClick={handleBackToProfile}
                        bgColor="primary"
                    />
                </Link>
            </div>
        </div>
    );
};

export default CourseEditor;
