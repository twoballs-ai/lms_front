import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { apiLmsUrl } from "../../../../../shared/config";
import axios from "axios";

import "./FullCourseEdit.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";
import AddStageLesson from "./AddStageLesson";
import AddingClassicLesson from "./TypeLessonForm/ClassicLesson";
import AddingVideoLesson from "./TypeLessonForm/VideoLesson";
import CourseEditorService from "../../../../../services/course.editor.service";
import { SettingOutlined } from '@ant-design/icons';
import PopupMenu from "../../../../reUseComponents/PopupMenu";
function EditModuleStage({ moduleEditData }) {

    const [moduleData, setModuleData] = useState([]);

    const [selectedStage, setSelectedStage] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const handleShowClassicLesson = async () => {
        const dataParams = {
            module_id: moduleEditData.id,
            title: "",
            html_code_text: "",
        }
        const response = await CourseEditorService.editCoursePageAddClassicLesson(dataParams)

        if (response.status === 200 || response.status === 201) {
            // setModuleData();
            const newElement = response.data.data; // Используем данные из response.data для создания нового элемента
            setModuleData(prevModuleData => [...prevModuleData, newElement]);
            setSelectedStage(newElement)
        }

        handleCloseModal()
    };
    const handleShowVideoLesson = () => {
        // Переключаем состояние showClassicLesson
        // console.log(addVideolesson)


        handleCloseModal()
    };
    const handleSelectStage = (tech) => {


        setSelectedStage(tech);
    };

    useLayoutEffect(() => {
        const fetchData = async () => {

            await CourseEditorService.editCoursePageGetModuleStage(moduleEditData.id).then((response) => {
                // console.log(response.data.data)
                if (response.status === 200 || response.status === 201) {
                    setModuleData(response.data.data);
                    if (response.data.data.length !== 0) {
                        // console.log(response.data.data[0])
                        // console.log(response.data.data[0]);
                        // Устанавливаем selectedStage во второй элемент массива data
                        setSelectedStage(response.data.data[0]);
                    } else {
                        // Устанавливаем selectedStage в первый элемент массива data
                        setSelectedStage(null);
                    }
                }
            });

        };
        fetchData();
    }, [moduleEditData]);


    const addStage = async () => {

        handleOpenModal()
    };

    const contentToModal = (<AddStageLesson handleShowClassicLesson={handleShowClassicLesson} handleShowVideoLesson={handleShowVideoLesson} />)


    const [handlePopupOpen, setHandlePopupOpen] = useState(false);

    const showPopupMenu = () => {
      setHandlePopupOpen(true);
    };
  
    const handlePopupClose = () => {
      setHandlePopupOpen(false);
    };
  

    const popupContent = () => {

        const deleteChapter = async () => {
    
          const response = await CourseEditorService.editCoursePageDeleteModule(
            moduleEditData.id
          );
          if (response.status === 200 || response.status === 201) {
            // const updatedChapters = getChapters.filter(item => item.id !== chapter.id);
            // setGetChapters(updatedChapters);
          }
        };
    
        return (
          <>
            <LmsButton
              buttonText={"Удалить модуль"}
              handleClick={deleteChapter}
            />
          </>
        )
      }


      const deleteStage = async () => {
    
        const response = await CourseEditorService.editCoursePageDeleteStage(
            selectedStage.id
        );
        if (response.status === 200 || response.status === 201) {
          // const updatedChapters = getChapters.filter(item => item.id !== chapter.id);
          // setGetChapters(updatedChapters);
          const updatedModuleData = moduleData.filter(stage => {
            if (stage.id !== selectedStage.id) {
                return true; // Оставляем этап, если его id не равен id удаленного этапа
            } else {
                // Если это удаленный этап, проверяем, является ли это первый элемент в списке
                // Если это первый элемент, выбираем следующий за ним
                // В противном случае, выбираем предыдущий элемент
                const selectedIndex = moduleData.findIndex(stage => stage.id === selectedStage.id);
                setSelectedStage(selectedIndex === 0 ? moduleData[1] : moduleData[selectedIndex - 1]);
                return false; // Исключаем удаленный этап из списка
            }
        });
        // Обновляем состояние moduleData
        setModuleData(updatedModuleData);
        }
      };
  

console.log(selectedStage)

    const Dot = ({ tech, isActive }) => {

        const activeClass = isActive ? "active" : "";


        return (
            <div className={`dot ${activeClass}`} onClick={() => handleSelectStage(tech)}>

                <>
                    {tech.type === "video" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faFilm} transform="down-6 grow-3" />
                        </div>
                    ) : tech.type === "classic" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faChalkboardUser} transform="down-6 grow-3" />
                        </div>
                    ) : tech.type === "quiz" ? (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faSquareCheck} transform="down-6 grow-3" />
                        </div>
                    ) : (
                        <div className="mt-1">
                            <FontAwesomeIcon icon={faGhost} transform="down-6 grow-3" />
                        </div>
                    )}

                </>



            </div>
        )

    }

    return (
        <>
            <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentToModal} />
            <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={handlePopupClose} title={`Найстроки модуля: ${moduleEditData.title}`} popupContent={popupContent()} />

            <div className="main__nav-block"><p>Вы перешли на страницу редактирования модуля: "{moduleEditData.title}"</p>
            <div className="nav-block__popup-menu"><button className="popup-menu__button" onClick={showPopupMenu}><SettingOutlined style={{ fontSize: '24px' }} /></button></div>
            
                <div className="nav-block__stages" >
                    {moduleData.length < 20 && (
                        // <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <div className="stages__add"><LmsButton buttonText={"Добавить урок"} handleClick={addStage} /></div>


                    )}
                    <div className="stages__case">
                        {moduleData.map((tech, index) => (
                            <div className="" key={tech.id}>
                                <Dot tech={tech} isActive={selectedStage && tech.id === selectedStage.id} />
                            </div>
                        ))}
                    </div>
                    {/* {selectedStage === 1 && (
                    <button type="button" className="btn btn-danger mt-3" onClick={handleDeleteStage}>
                        Удалить {selectedStage} этап
                    </button>
                )} */}


                </div>
            </div>
            <div className="main__content">
<div className="content__mini-menu">
    {selectedStage &&
<LmsButton
            buttonText={"Удалить урок"}
            handleClick={deleteStage}
          />}
</div>

                    {selectedStage && (
                        (selectedStage.type === "classic" && <AddingClassicLesson selectedStage={selectedStage} />) ||
                        (selectedStage.type === "video" && <AddingVideoLesson selectedStage={selectedStage} />)
                        // (selectedStage.items.type === "video" && <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} />)
                    )}
                    {/* <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} /> */}

                    {/* {selectedStage ? <AddingClassicLesson addClasiclesson={addClasiclesson} setModuleData={setModuleData} /> : ""} */}
                    {/* {addClasiclesson ? (
                        <AddingClassicLesson selectedStage={selectedStage} addClasiclesson={addClasiclesson} setModuleData={setModuleData} />
                    ) : addVideolesson ? (
                        <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} />
                    ) : null} */}

                    {/* <AddingVideoLesson selectedStage={selectedStage} addVideolesson={addVideolesson} setModuleData={setModuleData} /> */}


            </div>


        </>
    );
}
export default EditModuleStage;