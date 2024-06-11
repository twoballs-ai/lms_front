import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../../../services/student.service"; // Adjust the import based on your file structure
import LearningClassicLesson from "./TypeLessonForm/ClassicLesson";
import LearningVideoLesson from "./TypeLessonForm/VideoLesson";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
import "./FullCourseLearn.scss";
import LmsButton from "../../../../reUseComponents/Button"; // Adjust the import based on your file structure
import LearningQuizLesson from "./TypeLessonForm/QuizLesson";

function ModuleStageLearn({ moduleEditData, setModuleEditData, getChapters, setGetChapters }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    const handleSelectStage = (tech) => {
        setSelectedStage(tech);
        setLessonCompleted(tech.is_completed); // Set the lesson completed state based on the selected stage
    };

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await StudentService.learnGetModuleStages(moduleEditData.id);
            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;
                setModuleData(data);
                // Find the first stage that is not completed
                const firstNonCompletedStage = data.find(stage => !stage.is_completed);
                if (firstNonCompletedStage) {
                    setSelectedStage(firstNonCompletedStage);
                    setLessonCompleted(firstNonCompletedStage.is_completed); // Set the lesson completed state based on the first stage
                } else if (data.length !== 0) {
                    setSelectedStage(data[0]);
                    setLessonCompleted(data[0].is_completed); // Fallback to the first stage if all are completed
                } else {
                    setSelectedStage(null);
                    setLessonCompleted(false); // Reset the lesson completed state
                }
            }
        };
        fetchData();
    }, [moduleEditData]);

    const Dot = ({ tech, isActive }) => {
        const activeClass = isActive ? "active" : "";
        const completedClass = tech.is_completed ? "completed" : "";
        return (
            <div className={`learn_dot ${activeClass} ${completedClass}`} onClick={() => handleSelectStage(tech)}>
                {tech.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
                {tech.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
                {tech.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
                {!["video", "classic", "quiz"].includes(tech.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
            </div>
        );
    };

    const handleNextStage = async () => {
        if (!selectedStage) return;

        try {
            const response = await StudentService.updateStage(selectedStage.id, true);
            if (response.status === 200 || response.status === 201) {
                const updatedModuleData = moduleData.map(stage =>
                    stage.id === selectedStage.id ? { ...stage, is_completed: true } : stage
                );
                setModuleData(updatedModuleData);

                const currentIndex = updatedModuleData.findIndex(stage => stage.id === selectedStage.id);
                if (currentIndex !== -1 && currentIndex < updatedModuleData.length - 1) {
                    const nextStage = updatedModuleData.slice(currentIndex + 1).find(stage => !stage.is_completed);
                    if (nextStage) {
                        setSelectedStage(nextStage);
                        setLessonCompleted(nextStage.is_completed);
                    } else {
                        setSelectedStage(null);
                        setLessonCompleted(false);
                    }
                } else {
                    setSelectedStage(null);
                    setLessonCompleted(false);
                }
            }
        } catch (error) {
            console.error("Failed to update stage", error);
        }
    };

    return (
        <>
            <div className="main__nav-block">
                <p>Вы проходите модуль: "{moduleEditData.title}"</p>
                <div className="nav-block__stages">
                    <div className="stages__case">
                        {moduleData.map((tech) => (
                            <div key={tech.id}>
                                <Dot tech={tech} isActive={selectedStage && tech.id === selectedStage.id} />
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
                    {selectedStage.type === "classic" && <LearningClassicLesson selectedStage={selectedStage} onComplete={handleNextStage}/>}
                    {selectedStage.type === "video" && <LearningVideoLesson selectedStage={selectedStage} onComplete={handleNextStage} />}
                    {selectedStage.type === "quiz" && <LearningQuizLesson selectedStage={selectedStage} onComplete={handleNextStage} />}
                </div>
            )}
        </>
    );
}

export default ModuleStageLearn;
