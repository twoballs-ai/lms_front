import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import StudentService from "@/services/student.service";
import LearningClassicLesson from "./TypeLessonForm/ClassicLesson";
import LearningVideoLesson from "./TypeLessonForm/VideoLesson";
import LearningQuizLesson from "./TypeLessonForm/QuizLesson";
import "./FullCourseLearn.scss";

function ModuleStageLearn({ moduleEditData, chapters, setChapters, setNextModuleAndChapter, course_id, checkCompletionStatus }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);
    useLayoutEffect(() => {
        const fetchModuleData = async () => {
            const response = await StudentService.learnGetModuleStages(moduleEditData.id);
            if (response.status === 200 || response.status === 201) {
                const stages = response.data.data;
    
                // Сортируем stages по sort_index от малого к большому
                const sortedStages = stages.sort((a, b) => a.sort_index - b.sort_index);
    
                setModuleData(sortedStages);
    
                const firstNonCompletedStage = sortedStages.find(stage => !stage.is_completed && !stage.is_locked);
                if (firstNonCompletedStage) {
                    setSelectedStage(firstNonCompletedStage);
                    setLessonCompleted(firstNonCompletedStage.is_completed);
                } else if (sortedStages.length) {
                    setSelectedStage(sortedStages[0]);
                    setLessonCompleted(sortedStages[0].is_completed);
                } else {
                    setSelectedStage(null);
                    setLessonCompleted(false);
                }
            }
        };
    
        fetchModuleData();
    }, [moduleEditData]);

    const handleSelectStage = (stage) => {
        const chapter = chapters.find(ch => ch.id === moduleEditData.chapter_id);
        if (!stage.is_locked && !chapter.is_locked) {
            setSelectedStage(stage);
            setLessonCompleted(stage.is_completed);
        }
    };

    const handleNextStage = async () => {
        if (!selectedStage || selectedStage.is_locked) return;

        try {
            const response = await StudentService.updateStage(selectedStage.id, true);
            if (response.status === 200 || response.status === 201) {
                const updatedModuleData = moduleData.map(stage =>
                    stage.id === selectedStage.id ? { ...stage, is_completed: true } : stage
                );
                setModuleData(updatedModuleData);

                const currentIndex = updatedModuleData.findIndex(stage => stage.id === selectedStage.id);
                const nextStage = updatedModuleData.slice(currentIndex + 1).find(stage => !stage.is_completed && !stage.is_locked);

                if (nextStage) {
                    setSelectedStage(nextStage);
                    setLessonCompleted(nextStage.is_completed);
                } else {
                    await updateChapterProgress();
                }
            }
        } catch (error) {
            console.error("Failed to update stage", error);
        }
    };

    const updateChapterProgress = async () => {
        const chaptersResponse = await StudentService.learnCoursePageGetChapterList(course_id);
        if (chaptersResponse.status === 200 || chaptersResponse.status === 201) {
            const updatedChapters = chaptersResponse.data.data;
            setChapters(updatedChapters);

            const currentChapter = updatedChapters.find(ch => ch.id === moduleEditData.chapter_id);
            const currentModuleIndex = currentChapter.modules.findIndex(m => m.id === moduleEditData.id);
            const nextModuleIndex = currentModuleIndex + 1;

            if (nextModuleIndex < currentChapter.modules.length) {
                const nextModule = currentChapter.modules[nextModuleIndex];
                setNextModuleAndChapter(currentChapter.id, nextModule.id);
            } else {
                const nextChapterIndex = updatedChapters.findIndex(ch => ch.id === currentChapter.id) + 1;
                if (nextChapterIndex < updatedChapters.length) {
                    const nextChapter = updatedChapters[nextChapterIndex];
                    const nextModule = nextChapter.modules.find(m => !m.is_locked) || null;
                    if (nextModule) {
                        setNextModuleAndChapter(nextChapter.id, nextModule.id);
                    } else {
                        setSelectedStage(null);
                        setLessonCompleted(false);
                    }
                } else {
                    setSelectedStage(null);
                    setLessonCompleted(false);
                }
            }

            checkCompletionStatus(updatedChapters);
        }
    };

    const Dot = ({ stage, isActive }) => {
        const handleClick = () => handleSelectStage(stage);
        return (
            <div
                className={`learn_dot ${isActive ? "active" : ""} ${stage.is_completed ? "completed" : ""} ${stage.is_locked ? "locked" : ""}`}
                onClick={handleClick}
            >
                {stage.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
                {stage.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
                {stage.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
                {!["video", "classic", "quiz"].includes(stage.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
            </div>
        );
    };

    return (
        <>
            <div className="learn-main__nav-block">
                <p>Вы проходите модуль:  &quot;{moduleEditData.title}&quot;</p>
                <div className="nav-block__stages">
                    <div className="stages__case">
                        {moduleData.map((stage) => (
                            <div key={stage.id}>
                                <Dot stage={stage} isActive={selectedStage && stage.id === selectedStage.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedStage && (
                <div className="main-student__content">
                    {lessonCompleted && (
                        <div className="completion-message">
                            <p>Вы прошли урок, продолжайте в том же духе!</p>
                        </div>
                    )}

                    {selectedStage.type === "classic" && <LearningClassicLesson selectedStage={selectedStage} onComplete={handleNextStage} />}
                    {selectedStage.type === "video" && <LearningVideoLesson selectedStage={selectedStage} onComplete={handleNextStage} />}
                    {selectedStage.type === "quiz" && <LearningQuizLesson selectedStage={selectedStage} onComplete={handleNextStage} />}
                </div>
            )}
        </>
    );
}

export default ModuleStageLearn;
