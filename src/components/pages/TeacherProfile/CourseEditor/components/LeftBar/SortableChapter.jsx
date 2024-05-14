import React, { useEffect, useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LmsButton from "../../../../../reUseComponents/Button";
import { DragVerticalIcon } from '../../../../../icons/icons';
import LmsModalBase from '../../../../../reUseComponents/ModalBase';
import TextInput from "../../../../../reUseComponents/TextInput";
import CourseEditorService from "../../../../../../services/course.editor.service";
import { SettingOutlined } from '@ant-design/icons';
import { Button } from "antd";
import PopupMenu from "../../../../../reUseComponents/PopupMenu";
const SortableChapter = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  getChapters,
  setGetChapters,
  moduleChange,
}) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });


  const [handlePopupOpen, setHandlePopupOpen] = useState(false);

  const showPopupMenu = () => {
    setHandlePopupOpen(true);
  };

  const handlePopupClose = () => {
    setHandlePopupOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);




  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [inputTitleValue, setInputTitleValue] = useState('');
  const [inputDescrValue, setInputDescreValue] = useState('');
  const handleInputChange = (e) => {
    setInputTitleValue(e.target.value);
  };


  const handleInputDescrChange = (e) => {
    setInputDescreValue(e.target.value);
  };



  const AddChapterOpenModal = async () => {
    handleOpenModal()
  };
  const contentAddChapterToModal = () =>
  (
    <div>
      <h2>Вы добавляете модуль </h2>
      <p>Название модуля:</p>
      <TextInput isTextArea={false} placeholder={"Напишите сюда название курса"} value={inputTitleValue} onChange={handleInputChange} />
      <p>Описание модуля:</p>
      <TextInput isTextArea={true} placeholder={"Напишите сюда описание курса"} value={inputDescrValue} onChange={handleInputDescrChange} />
      <LmsButton buttonText={"Создать"} handleClick={addModule} />

    </div>
  );
  const addModule = async () => {
    console.log(chapter.id)
    const dataParams = {
      chapter_id: chapter.id,
      title: inputTitleValue,
      description: inputDescrValue,
    };
    const response = await CourseEditorService.editCoursePageAddModule(
      dataParams
    );
    if (response.status === 200 || response.status === 201) {
      const newModule = response.data.modules;

      const newData = [...getChapters];
      const existingChapter = newData.find(
        (chapter) => chapter.id === newModule.chapter_id
      );

      if (existingChapter) {
        // Если глава существует, добавляем новый модуль к массиву модулей главы
        existingChapter.modules.push(newModule);
      }

      setGetChapters(newData);
      handleCloseModal()
    }
  };

  const popupContent = () => {

    const deleteChapter = async () => {

      const response = await CourseEditorService.editCoursePageDeleteChapter(
        chapter.id
      );
      if (response.status === 200 || response.status === 201) {
        const updatedChapters = getChapters.filter(item => item.id !== chapter.id);
        setGetChapters(updatedChapters);
      }
    };

    return (
      <>
        <LmsButton
          buttonText={"Удалить главу"}
          handleClick={deleteChapter}
        />
      </>
    )
  }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`chapters__block ${activeChapterId === chapter.id ? 'active' : ''}${isDragging ? 'opacity-50' : ''
        }`}
      key={chapter.sort_index}
      onClick={() => setActiveChapterId(chapter.id)}
    >

      <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentAddChapterToModal()} />
      <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={handlePopupClose} title={`Найстроки раздела: ${chapter.title}`} popupContent={popupContent()} />
      <div className="block__title"><p>{chapter.title}</p>
        <button {...listeners} className={"title__menu"}  >
          <DragVerticalIcon />
        </button></div>
      {/* <LmsButton buttonText={"Добавить модуль"} handleClick={(e) => addModule(chapter.id)} /> */}
      <LmsButton
        buttonText={"Добавить модуль"}
        handleClick={AddChapterOpenModal}
      />
      <div className="chapters__modules">
        {/* {chapter.modules.map((module) => (
        <div key={module.id} className="modules__block" onClick={(e) => moduleChange(module)} >{module.title}</div>
    ))} */}
        {children}
      </div>
      <button className="block__chapter_menu" onClick={showPopupMenu}><SettingOutlined style={{ fontSize: '24px' }} /></button>
    </div>

  );
}


export default SortableChapter;