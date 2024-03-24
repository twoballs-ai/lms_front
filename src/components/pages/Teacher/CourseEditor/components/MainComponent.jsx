import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

// import LeftBar from "./LeftBar";
import "./MainComponent.scss"
import { apiLmsUrl } from "../../../../../shared/config";
import LmsButton from "../../../../reUseComponents/Button";
import ModulesList from "./ModulesList";

function MainComponent() {
    const course_id = 1
    const [getChapters, setGetChapters] = useState([])
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                axios
                    .get(
                        apiLmsUrl + `course-chapter-list/${course_id}`
                        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                        // ,{headers: { "Content-Type": "multipart/form-data" }}
                    )
                    .then((response) => {
                        setGetChapters(response.data.data)
                        console.log(response.data);
                    });
            } catch (e) {
                console.log(e);
            }
        };
        fetchData()

        
    }, []);

    const addChapter = (e) => {
        console.log("123")
     const dataParams = {
        course_id:1,
        title:"новая глава",
        description:"очередная новая глава"
     }
        try {
            axios
                .post(
                    `${apiLmsUrl}add_chapter_to_course/`,
                    dataParams,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response.data.chapters);
                    if (response.status === 200) {
                        const newData = [...getChapters, response.data.chapters];
                        setGetChapters(newData);
                    // console.log(...getChapters, response.data.chapters)
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setStudentData({ status: "error" });
        }
    };
    const addModule = (chapter_id) => {
        console.log("123")
     const dataParams = {
        chapter_id:chapter_id,
        title:"новая модуль",
        description:"очередной новый модуль"
     }
        try {
            axios
                .post(
                    `${apiLmsUrl}add_module_to_chapter/`,
                    dataParams,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response.data.modules);
                    if (response.status === 200) {
                        const newModule = response.data.modules;

                        const newData = [...getChapters];
                        const existingChapter = newData.find(chapter => chapter.id === newModule.chapter_id);
            
                        if (existingChapter) {
                            // Если глава существует, добавляем новый модуль к массиву модулей главы
                            existingChapter.modules.push(newModule);
                        }
            
                        setGetChapters(newData);
                    // console.log(...getChapters, response.data.chapters)
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setStudentData({ status: "error" });
        }
    };

console.log(getChapters)

    return (
   
            <div className="course-edit__container">
                <div className="container__leftbar">
                    <div className="leftbar__chapters">
                    <LmsButton buttonText={"Добавить раздел"} handleClick={addChapter} />
                {getChapters.map((chapter)=>(
<>
                <div className="chapters__block">
                <div key={chapter.id} className="chapters__title">{chapter.title}</div>
                <LmsButton buttonText={"Добавить модуль"} handleClick={(e) => addModule(chapter.id)} />
                    <ModulesList chapter={chapter}/>
                    </div>
                </>
                ))}
                </div>
                
                </div>

                <div className="container__main">
                    <Outlet />
                </div>
            </div>
 
    );
}

export default MainComponent;
