import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

import axios from "axios";
// import ListGroup from "react-bootstrap/ListGroup";
// import { apiUrl, typesApiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from 'react-router-dom';
import LmsButton from '../../../../reUseComponents/Button';
function AddStageLesson({ handleShowClassicLesson }) {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    // const [stageData, setStageData] = useState([]);
    const navigate = useNavigate();
    // const addClassicLesson = () => {
    //     console.log('hi')  
    //     navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'classicLesson' } });
    // };
    // const addQuizLesson = () => {
    //     console.log('hi')  
    //     navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'quizLesson' } });
    // };
    // const addVideoLesson = () => {
    //     console.log('hi')  
    //     navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'videoLesson' } });
    // };
    // const addProgrammingLesson = () => {
    //     console.log('hi')  
    //     navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'codingLesson' } });
    // };
    // console.log(stageData);
    return (
        <>
            

            <div className='add-lesson'>
            <p>Вы создали урок, но теперь нужно наполнить его контентом</p>
                <div className='add-lesson__block'>
                

                            <div>Классический урок</div>
                            <div
                            >
                                Классический урок позволяет добавлять текст,
                                картинки, ссылки, текст может быть сложно
                                форматируемым.
                            </div>
                            <LmsButton buttonText={"Выбрать классический урок"} handleClick={handleShowClassicLesson}  />
                   
          
                </div>
                <div className='add-lesson__block'>
                     
                            <div>Видео урок</div>
                            <div>
                                В видео уроке вам доступны название урока,
                                описание и ссылка на ваш видеоурок
                            </div>
                            <LmsButton buttonText={"Выбрать видео урок"}  handleClick={"addStage"} />
                       
               
                </div>
                <div className='add-lesson__block'>
                   
                            <div>Квиз</div>
                            <divt>
                                Квиз позволит выбрать один ответ или несколько в
                                зависимости от выбранного вами типа квиза.
                            </divt>
                            <LmsButton buttonText={"Выбрать квиз"}  handleClick={"addStage"} />
                       
                  
                </div>
                {/* <div>
                    <div border="info" style={{ width: "18rem" }}>
                        <div>
                            <div>
                                Написание программы или ее части
                            </div>
                            <divt>
                                Практический урок который позволит отточить ваши
                                навыки программирования.
                            </divt>
                            <button
                           onClick={addProgrammingLesson}
                            variant="primary"
                        >
                            Выбрать
                        </button>
                            
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
export default AddStageLesson;
