import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../../../services/student.service"; // Adjust the import based on your file structure
import LearningClassicLesson from "./TypeLessonForm/ClassicLesson";
import LearningVideoLesson from "./TypeLessonForm/VideoLesson";
import LearningQuizLesson from "./TypeLessonForm/QuizLesson";
import "./FullCourseLearn.scss";

function ModuleStageLearn({ moduleEditData, setModuleEditData, getChapters, setGetChapters, setNextModuleAndChapter }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

const handleSelectStage = (tech) => {
    if (tech.accessible && !tech.is_locked) {
        setSelectedStage(tech);
        setLessonCompleted(tech.is_completed);
    }
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
  const isLockedClass = tech.is_locked ? "locked" : "";
  
  const handleClick = () => {
    if (!tech.is_locked && tech.accessible) {
      handleSelectStage(tech);
    }
  };
  
  return (
    <div className={`learn_dot ${activeClass} ${completedClass} ${isLockedClass}`} onClick={handleClick}>
      {tech.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
      {tech.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
      {tech.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
      {!["video", "classic", "quiz"].includes(tech.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
    </div>
  );
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
        if (currentIndex !== -1 && currentIndex < updatedModuleData.length - 1) {
          const nextStage = updatedModuleData.slice(currentIndex + 1).find(stage => !stage.is_completed && !stage.is_locked);
          if (nextStage) {
            setSelectedStage(nextStage);
            setLessonCompleted(nextStage.is_completed);
          } else {
            setSelectedStage(null);
            setLessonCompleted(false);
          }
        } else {
          // Handle the transition to the next module or chapter
          const currentModuleIndex = getChapters.findIndex(ch => ch.modules.some(m => m.id === moduleEditData.id));
          const nextModuleIndex = getChapters[currentModuleIndex].modules.findIndex(m => m.id === moduleEditData.id) + 1;
  
          if (nextModuleIndex < getChapters[currentModuleIndex].modules.length) {
            const nextModule = getChapters[currentModuleIndex].modules[nextModuleIndex];
            setNextModuleAndChapter(moduleEditData.chapter_id, nextModule.id);
          } else {
            const nextChapterIndex = currentModuleIndex + 1;
            if (nextChapterIndex < getChapters.length) {
              const nextChapter = getChapters[nextChapterIndex];
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
