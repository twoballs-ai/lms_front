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
            console.log(fetchedChapters);
            setChapters(fetchedChapters);
            const [firstIncompleteChapter, firstIncompleteModule] = findFirstIncomplete(fetchedChapters);
            setActiveChapterId(firstIncompleteChapter);
            setActiveModuleId(firstIncompleteModule);
            setModuleEditData(
                firstIncompleteModule ? fetchedChapters.find(ch => ch.id === firstIncompleteChapter).modules.find(m => m.id === firstIncompleteModule) : {}
            );

            checkCompletionStatus(fetchedChapters);
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

        if (examChapterIndex !== -1) {
            const allChaptersBeforeExamCompleted = chapters.slice(0, examChapterIndex).every(ch => ch.chapter_is_completed);
            setShowExamPrompt(allChaptersBeforeExamCompleted && !allChaptersAndModulesCompleted);
        } else {
            setShowExamPrompt(false);
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
                    fetchChapters();
                    setShowExamPrompt(false);
                } else {
                    console.error("Failed to start exam:", response.data.message);
                }
            } catch (error) {
                console.error("Error starting exam:", error.message);
            }
        }
    };

    // Функция для изменения данных модуля
    const moduleChange = (module) => {
        setModuleEditData(module);
    };

    return (
        <div className="course-learn__container">
            <div className="container__leftbar">
                <div className="leftbar__chapters">
                    {chapters.map((chapter, index) => (
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
                                    isLocked={module.is_locked}
                                    moduleChange={moduleChange} // Передаем функцию moduleChange
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
                        checkCompletionStatus={checkCompletionStatus}
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
