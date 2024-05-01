import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";

// import LeftBar from "./LeftBar";
import "./MainComponent.scss"
import { apiLmsUrl } from "../../../../../shared/config";
import LmsButton from "../../../../reUseComponents/Button";
import EditModuleStage from "../FullCourseEdit/EditModuleStage";
import CourseEditorService from "../../../../../services/course.editor.service";

function CourseEditor() {
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([])
    const [moduleEditData, setModuleEditData] = useState([])
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля

    useEffect(() => {

        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(course_id).then((response) => {
                // console.log(response)
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data.data)
                    setGetChapters(response.data.data)
                }
            });
        };
        fetchData()
    }, []);

    const addChapter = async (e) => {
        // console.log("123")
        const dataParams = {
            course_id: course_id,
            title: "новая глава",
            description: "очередная новая глава"
        }
        const response = await CourseEditorService.editCoursePageAddChapter(dataParams)
        if (response.status === 200 || response.status === 201) {
            const newData = [...getChapters, response.data.chapters];
            setGetChapters(newData);
        }
    };
    const addModule = async (chapter_id) => {
        // console.log("123")
        const dataParams = {
            chapter_id: chapter_id,
            title: "новая модуль",
            description: "очередной новый модуль"
        }
        const response = await CourseEditorService.editCoursePageAddModule(dataParams)
        if (response.status === 200 || response.status === 201) {
            const newModule = response.data.modules;

            const newData = [...getChapters];
            const existingChapter = newData.find(chapter => chapter.id === newModule.chapter_id);

            if (existingChapter) {
                // Если глава существует, добавляем новый модуль к массиву модулей главы
                existingChapter.modules.push(newModule);
            }

            setGetChapters(newData);
        }
    };
    const moduleChange = (module) => {
        setModuleEditData(module)
    }


    return (

        <div className="course-edit__container">
            <div className="container__leftbar">
                <div className="leftbar__chapters">
                    <LmsButton buttonText={"Добавить раздел"} handleClick={addChapter} />
                    {getChapters.map((chapter) => (

                        <div className={`chapters__block ${activeChapterId === chapter.id ? 'active' : ''}`} key={chapter.id} onClick={() => setActiveChapterId(chapter.id)}>
                            <div className="block__title"><p>{chapter.title}</p></div>
                            <LmsButton buttonText={"Добавить модуль"} handleClick={(e) => addModule(chapter.id)} />
                            <div className="chapters__modules">
                                {/* {chapter.modules.map((module) => (
                                    <div key={module.id} className="modules__block" onClick={(e) => moduleChange(module)} >{module.title}</div>
                                ))} */}
                                {chapter.modules.map((module) => (
                                    <div
                                        key={module.id}
                                        className={`modules__block ${activeModuleId === module.id ? "active" : ""}`}
                                        onClick={() => {
                                            setActiveModuleId(module.id);
                                            moduleChange(module);
                                        }}
                                    >
                                        {module.title}
                                    </div>
                                ))}
                            </div>
                        </div>

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

export default CourseEditor;