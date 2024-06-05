import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./CourseLearning.scss";
import CourseEditorService from "../../../../../../services/course.editor.service";
import Chapter from "./LearningChapter";
import Modules from "./LearningModules";
import ModuleStageLearn from "../../FullCoursePassing/ModuleStageLearn";
function CourseLearning() {
    
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля

    const moduleChange = (module) => {
        setModuleEditData(module);
    };

    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(course_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    // Sort the modules within each chapter by sort_index
                    const sortedChapters = response.data.data.map(chapter => {
                        const sortedModules = chapter.modules.sort((a, b) => a.sort_index - b.sort_index);
                        return { ...chapter, modules: sortedModules };
                    });
                    setGetChapters(sortedChapters);
                }
            });
        };
        fetchData();
    }, [course_id]);


    const sortedChapters = [...getChapters].sort((a, b) => a.sort_index - b.sort_index);
console.log(sortedChapters)
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
                                                onMoveUp={() => handleMoveModule(chapter.id, module.id, -1)}
                                                onMoveDown={() => handleMoveModule(chapter.id, module.id, 1)}
                                                isFirst={index === 0}
                                                isLast={index === chapter.modules.length - 1}
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
                    />
                )}
            </div>
        </div>
    );
}

export default CourseLearning;
