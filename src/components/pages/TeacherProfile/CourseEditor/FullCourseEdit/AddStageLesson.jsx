import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

import axios from "axios";
// import ListGroup from "react-bootstrap/ListGroup";
// import { apiUrl, typesApiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from 'react-router-dom';
import LmsButton from '../../../../reUseComponents/Button';
function AddStageLesson({ handleShowClassicLesson, handleShowVideoLesson, handleShowQuizLesson }) {

    return (
        <>


            <div className='add-lesson'>
                <p>Вы создали урок, но теперь нужно наполнить его контентом</p>
                <div className='add-lesson__lesson_block'>


                    <div className='lesson_block__title'>Классический урок</div>
                    <div className='lesson_block__body'>
                        Классический урок позволяет добавлять текст,
                        картинки, ссылки, текст может быть сложно
                        форматируемым.
                    </div>
                    <div className='lesson_block__footer'>
                        <LmsButton buttonText={"Выбрать классический урок"} handleClick={handleShowClassicLesson} />
                    </div>

                </div>
                <div className='add-lesson__lesson_block'>

                    <div className='lesson_block__title'>Видео урок</div>
                    <div className='lesson_block__body'>
                        В видео уроке вам доступны название урока,
                        описание и ссылка на ваш видеоурок
                    </div>
                    <div className='lesson_block__footer'>
                        <LmsButton buttonText={"Выбрать видео урок"} handleClick={handleShowVideoLesson} />
                    </div>

                </div>
                <div className='add-lesson__lesson_block'>

                    <div className='lesson_block__title'>Квиз</div>
                    <div className='lesson_block__body'>
                        Квиз позволит выбрать один ответ или несколько в
                        зависимости от выбранного вами типа квиза.
                    </div>
                    <div className='lesson_block__footer'>
                        <LmsButton buttonText={"Выбрать квиз"} handleClick={handleShowQuizLesson} />
                    </div>


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
