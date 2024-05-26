import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";

// import { DragEndEvent } from '@dnd-kit/core';

import "./CourseEditor.scss";
import { apiLmsUrl } from "../../../../../../shared/config";
import LmsButton from "../../../../../reUseComponents/Button";
import EditModuleStage from "../../FullCourseLearning/ModuleStageLearn";
import CourseEditorService from "../../../../../../services/course.editor.service";
import SortableChapter from "./LearningChapter";
import LmsModalBase from "../../../../../reUseComponents/ModalBase";
import TextInput from "../../../../../reUseComponents/TextInput";
import SortableModules from "./LearningModules";

function CourseLearning() {
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([]);
    const [moduleEditData, setModuleEditData] = useState([]);
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля''

    useEffect(() => {
        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(
                course_id
            ).then((response) => {
                // console.log(response)
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data.data);
                    setGetChapters(response.data.data);
                }
            });
        };
        fetchData();
    }, []);


    const moduleChange = (module) => {
        setModuleEditData(module);
    };




    return (
        <div className="course-edit__container">



            <div className="container__leftbar">
                <div className="leftbar__chapters">

                    {getChapters.map((chapter) => (
                        <SortableChapter
                            id={chapter.sort_index}
                            key={chapter.sort_index} // Убедитесь, что уникальный ключ присутствует
                            chapter={chapter}
                            activeChapterId={activeChapterId}
                            setActiveChapterId={setActiveChapterId}

                            getChapters={getChapters}
                            setGetChapters={setGetChapters}
                        >


                            {chapter.modules.map((module) => (
                                // <div
                                //     key={module.id}
                                //     className={`modules__block ${activeModuleId === module.id ? "active" : ""}`}
                                //     onClick={() => {
                                //         setActiveModuleId(module.id);
                                //         moduleChange(module);
                                //     }}
                                // >
                                //     {module.title}
                                // </div>
                                <SortableModules
                                    title={module.title}
                                    moduleChange={moduleChange}
                                    id={module.id}
                                    key={module.id}
                                    module={module}
                                    activeModuleId={activeModuleId}
                                    setActiveModuleId={setActiveModuleId} />
                            ))}


                        </SortableChapter>
                    ))}
                </div>
            </div>


            <div className="container__main">
                {Object.keys(moduleEditData).length > 0 && (
                    <EditModuleStage moduleEditData={moduleEditData} />
                )}
            </div>
        </div>
    );
}

export default CourseLearning;
