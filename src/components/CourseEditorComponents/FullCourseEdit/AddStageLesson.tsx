import React from 'react';
// import { FileTextOutlined, VideoCameraOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import LmsButton from '@/components/reUseComponents/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
// import './LessonsStyle.scss';

function AddStageLesson({ handleShowClassicLesson, handleShowVideoLesson, handleShowQuizLesson }) {
    return (
        <>
            <div className='add-lesson'>
                <p>Вы создали урок, но теперь нужно наполнить его контентом</p>
                <div className='add-lesson__lesson_block'>
                    <div className='lesson_block__icon'>
                    <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />
                    </div>
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
                    <div className='lesson_block__icon'>
                    <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />
                    </div>
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
                    <div className='lesson_block__icon'>
                    <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />
                    </div>
                    <div className='lesson_block__title'>Квиз</div>
                    <div className='lesson_block__body'>
                        Квиз позволит выбрать один ответ или несколько в
                        зависимости от выбранного вами типа квиза.
                    </div>
                    <div className='lesson_block__footer'>
                        <LmsButton buttonText={"Выбрать квиз"} handleClick={handleShowQuizLesson} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddStageLesson;