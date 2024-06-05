import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGhost, faChalkboardUser, faFilm, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import CourseEditorService from "../../../../../services/course.editor.service";
import LearningClassicLesson from "./TypeLessonForm/ClassicLesson";
import LearningVideoLesson from "./TypeLessonForm/VideoLesson";
import AddingQuizLesson from "./TypeLessonForm/QuizLesson";
import "./FullCourseLearn.scss";

function ModuleStageLearn({ moduleEditData, setModuleEditData, getChapters, setGetChapters }) {
    const [moduleData, setModuleData] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);

    const handleSelectStage = (tech) => setSelectedStage(tech);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await CourseEditorService.editCoursePageGetModuleStage(moduleEditData.id);
            if (response.status === 200 || response.status === 201) {
                setModuleData(response.data.data);
                if (response.data.data.length !== 0) {
                    setSelectedStage(response.data.data[0]);
                } else {
                    setSelectedStage(null);
                }
            }
        };
        fetchData();
    }, [moduleEditData]);

    const Dot = ({ tech, isActive }) => {
        const activeClass = isActive ? "active" : "";
        return (
            <div className={`dot ${activeClass}`} onClick={() => handleSelectStage(tech)}>
                {tech.type === "video" && <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />}
                {tech.type === "classic" && <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />}
                {tech.type === "quiz" && <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />}
                {!["video", "classic", "quiz"].includes(tech.type) && <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />}
            </div>
        );
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
                <div className="main__content">
                    <div className="content__mini-menu"></div>
                    {selectedStage.type === "classic" && <LearningClassicLesson selectedStage={selectedStage} />}
                    {selectedStage.type === "video" && <LearningVideoLesson selectedStage={selectedStage} />}
                    {selectedStage.type === "quiz" && <AddingQuizLesson selectedStage={selectedStage} />}
                </div>
            )}
        </>
    );
}

export default ModuleStageLearn;