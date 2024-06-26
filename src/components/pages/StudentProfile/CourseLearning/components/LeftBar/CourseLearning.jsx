import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseLearning.scss";
import StudentService from "../../../../../../services/student.service";
import Chapter from "./LearningChapter";
import Modules from "./LearningModules";
import ModuleStageLearn from "../../FullCoursePassing/ModuleStageLearn";

function CourseLearning() {
    const { course_id } = useParams();
    const [chapters, setChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState({});
    const [activeChapterId, setActiveChapterId] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [showExamPrompt, setShowExamPrompt] = useState(false);
    const [allCompleted, setAllCompleted] = useState(false);

    useEffect(() => {
        fetchChapters();
    }, [course_id]);

    const fetchChapters = async () => {
        const response = await StudentService.learnCoursePageGetChapterList(course_id);
        if (response.status === 200 || response.status === 201) {
            const fetchedChapters = response.data.data;
            const processedChapters = fetchedChapters.map((chapter) => {
                chapter.modules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                return chapter;
            });

            setChapters(processedChapters);
            const [firstIncompleteChapter, firstIncompleteModule] = findFirstIncomplete(processedChapters);
            setActiveChapterId(firstIncompleteChapter);
            setActiveModuleId(firstIncompleteModule);
            setModuleEditData(
                firstIncompleteModule ? processedChapters.find(ch => ch.id === firstIncompleteChapter).modules.find(m => m.id === firstIncompleteModule) : {}
            );

            checkCompletionStatus(processedChapters);
        }
    };

    const findFirstIncomplete = (chapters) => {
        for (let i = 0; i < chapters.length; i++) {
            if (!chapters[i].chapter_is_completed && !chapters[i].is_locked) {
                const module = chapters[i].modules.find(module => !module.is_completed);
                if (module) return [chapters[i].id, module.id];
            }
        }
        return [null, null];
    };

    const checkCompletionStatus = (chapters) => {
        const allChaptersAndModulesCompleted = chapters.every(ch => ch.chapter_is_completed && ch.modules.every(m => m.is_completed));
        setAllCompleted(allChaptersAndModulesCompleted);

        const examChapterIndex = chapters.findIndex(ch => ch.is_exam);
        const chaptersBeforeExam = chapters.slice(0, examChapterIndex);

        const allChaptersBeforeExamCompleted = chaptersBeforeExam.every(ch => ch.chapter_is_completed);
        if (allChaptersBeforeExamCompleted && !allChaptersAndModulesCompleted) {
            setShowExamPrompt(true);
        } else {
            setShowExamPrompt(false);
        }

        if (examChapterIndex !== -1) {
            const updatedChapters = chapters.map((chapter, index) => {
                if (index > examChapterIndex) {
                    chapter.is_locked = true;
                    chapter.modules = chapter.modules.map(module => ({
                        ...module,
                        is_locked: true,
                    }));
                }
                return chapter;
            });
            setChapters(updatedChapters);
        }
    };

    const setNextModuleAndChapter = (nextChapterId, nextModuleId) => {
        setActiveChapterId(nextChapterId);
        setActiveModuleId(nextModuleId);
        const nextModule = chapters.find(ch => ch.id === nextChapterId)?.modules.find(m => m.id === nextModuleId);
        setModuleEditData(nextModule);
    };

    const handleStartExam = async () => {
        const examChapter = chapters.find(ch => ch.is_exam);
        if (examChapter) {
            try {
                const response = await StudentService.startExam(examChapter.id);
                if (response.status === 200 || response.status === 201) {
                    const updatedChapters = chapters.map(chapter => {
                        if (chapter.id === examChapter.id) {
                            chapter.exam_status.exam_in_progress = true;
                            chapter.exam_status.exam_start_time = new Date().toISOString();
                        }
                        return chapter;
                    });
                    setChapters(updatedChapters);
                    setShowExamPrompt(false);

                    fetchChapters();
                } else {
                    console.error("Failed to start exam:", response.data.message);
                }
            } catch (error) {
                console.error("Error starting exam:", error.message);
            }
        }
    };

    const sortedChapters = [...chapters].sort((a, b) => a.sort_index - b.sort_index);

    return (
        <div className="course-learn__container">
            <div className="container__leftbar">
                <div className="leftbar__chapters">
                    {sortedChapters.map((chapter, index) => (
                        <Chapter
                            key={chapter.id}
                            chapter={chapter}
                            activeChapterId={activeChapterId}
                            setActiveChapterId={setActiveChapterId}
                            isLocked={chapter.is_locked}
                            chapter_is_completed={chapter.chapter_is_completed}
                        >
                            {chapter.modules.map((module) => (
                                <Modules
                                    key={module.id}
                                    title={module.title}
                                    id={module.id}
                                    module={module}
                                    activeModuleId={activeModuleId}
                                    setActiveModuleId={setActiveModuleId}
                                    isLocked={chapter.is_locked || module.is_locked}
                                />
                            ))}
                        </Chapter>
                    ))}
                </div>
            </div>
            <div className="container__learn-main">
                {Object.keys(moduleEditData).length > 0 && !allCompleted && (
                    <ModuleStageLearn
                        moduleEditData={moduleEditData}
                        setModuleEditData={setModuleEditData}
                        chapters={chapters}
                        setChapters={setChapters}
                        setNextModuleAndChapter={setNextModuleAndChapter}
                        course_id={course_id}
                        setShowExamPrompt={setShowExamPrompt}
                        checkCompletionStatus={checkCompletionStatus} // Передаем функцию для проверки состояния завершения
                    />
                )}

                {showExamPrompt && !allCompleted && (
                    <div className="exam-prompt">
                        <p>Все предыдущие главы завершены. Готовы начать экзамен?</p>
                        <button onClick={handleStartExam}>Начать экзамен</button>
                    </div>
                )}

                {allCompleted && (
                    <div className="congratulations">
                        <p>Поздравляем! Вы прошли все уроки курса.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseLearning;
