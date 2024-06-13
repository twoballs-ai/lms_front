import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseLearning.scss";
import CourseEditorService from "../../../../../../services/course.editor.service";
import Chapter from "./LearningChapter";
import Modules from "./LearningModules";
import ModuleStageLearn from "../../FullCoursePassing/ModuleStageLearn";
import StudentService from "../../../../../../services/student.service";

function CourseLearning() {
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState({});
    const [activeChapterId, setActiveChapterId] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);

    const moduleChange = (module) => {
        setModuleEditData(module);
    };
console.log(getChapters)
    useEffect(() => {
        const fetchData = async () => {
            const response = await StudentService.learnCoursePageGetChapterList(course_id);
            if (response.status === 200 || response.status === 201) {
                const chapters = response.data.data;
                let lockNextChapters = false;
                let firstIncompleteChapter = null;
                let firstIncompleteModule = null;

                const processedChapters = chapters.map((chapter, index) => {
                    if (lockNextChapters) {
                        chapter.is_locked = true;
                    } else if (chapter.is_exam) {
                        const previousChaptersCompleted = index === 0 || chapters.slice(0, index).every(ch => ch.is_completed);
                        chapter.is_locked = !previousChaptersCompleted;
                        lockNextChapters = !previousChaptersCompleted || (chapter.is_exam && !chapter.is_completed);
                    } else {
                        chapter.is_locked = false;
                    }

                    chapter.modules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);

                    if (!chapter.is_completed && !firstIncompleteChapter) {
                        firstIncompleteChapter = chapter.id;
                        firstIncompleteModule = chapter.modules.find(module => !module.is_completed)?.id || null;
                    }

                    return chapter;
                });

                setGetChapters(processedChapters);
                setActiveChapterId(firstIncompleteChapter);
                setActiveModuleId(firstIncompleteModule);
                setModuleEditData(
                    firstIncompleteModule ? processedChapters.find(ch => ch.id === firstIncompleteChapter).modules.find(m => m.id === firstIncompleteModule) : {}
                );
            }
        };
        fetchData();
    }, [course_id]);

    const handleExamCompletion = async (chapterId) => {
        await CourseEditorService.completeExam(chapterId);

        const response = await StudentService.learnCoursePageGetChapterList(course_id);
        if (response.status === 200 || response.status === 201) {
            const chapters = response.data.data;
            let lockNextChapters = false;
            let firstIncompleteChapter = null;
            let firstIncompleteModule = null;

            const processedChapters = chapters.map((chapter, index) => {
                if (lockNextChapters) {
                    chapter.is_locked = true;
                } else if (chapter.is_exam) {
                    const previousChaptersCompleted = index === 0 || chapters.slice(0, index).every(ch => ch.is_completed);
                    chapter.is_locked = !previousChaptersCompleted;
                    lockNextChapters = !previousChaptersCompleted || (chapter.is_exam && !chapter.is_completed);
                } else {
                    chapter.is_locked = false;
                }

                chapter.modules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);

                if (!chapter.is_completed && !firstIncompleteChapter) {
                    firstIncompleteChapter = chapter.id;
                    firstIncompleteModule = chapter.modules.find(module => !module.is_completed)?.id || null;
                }

                return chapter;
            });

            setGetChapters(processedChapters);
            setActiveChapterId(firstIncompleteChapter);
            setActiveModuleId(firstIncompleteModule);
            setModuleEditData(
                firstIncompleteModule ? processedChapters.find(ch => ch.id === firstIncompleteChapter).modules.find(m => m.id === firstIncompleteModule) : {}
            );
        }
    };

    const setNextModuleAndChapter = (nextChapterId, nextModuleId) => {
        setActiveChapterId(nextChapterId);
        setActiveModuleId(nextModuleId);
        const nextModule = getChapters
            .find(ch => ch.id === nextChapterId)
            ?.modules.find(m => m.id === nextModuleId);
        setModuleEditData(nextModule);
    };

    const sortedChapters = [...getChapters].sort((a, b) => a.sort_index - b.sort_index);

    return (
        <div className="course-learn__container">
            <div className="container__leftbar">
                <div className="leftbar__chapters">
                    {sortedChapters.map((chapter) => (
                        <Chapter
                            id={chapter.sort_index}
                            key={chapter.sort_index}
                            chapter={chapter}
                            activeChapterId={activeChapterId}
                            setActiveChapterId={setActiveChapterId}
                            getChapters={getChapters}
                            setGetChapters={setGetChapters}
                            isLocked={chapter.is_locked}
                            isCompleted={chapter.is_completed}
                            onExamComplete={handleExamCompletion}
                        >
                            {chapter.modules.map((module, index) => (
                                <Modules
                                    title={module.title}
                                    moduleChange={moduleChange}
                                    id={module.id}
                                    key={module.sort_index}
                                    module={module}
                                    activeModuleId={activeModuleId}
                                    setActiveModuleId={setActiveModuleId}
                                    isLocked={(chapter.is_locked || module.is_locked) ?? false} // Обновленный способ передачи isLocked
                                />
                            ))}
                        </Chapter>
                    ))}
                </div>
            </div>
            <div className="container__learn-main">
                {Object.keys(moduleEditData).length > 0 && (
                    <ModuleStageLearn
                        moduleEditData={moduleEditData}
                        setModuleEditData={setModuleEditData}
                        getChapters={getChapters}
                        setGetChapters={setGetChapters}
                        setNextModuleAndChapter={setNextModuleAndChapter} // передаем функцию для установки следующего модуля и главы
                    />
                )}
            </div>
        </div>
    );
}

export default CourseLearning;
