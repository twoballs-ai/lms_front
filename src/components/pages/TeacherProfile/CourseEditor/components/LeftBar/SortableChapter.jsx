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
import ReusableSwitch from "../../../../../reUseComponents/Switcher";
import ReusableSliderWithInput from "../../../../../reUseComponents/Slider";
const SortableChapter = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  getChapters,
  setGetChapters,
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


  const [isExam, setIsExam] = useState(chapter.is_exam || false);
  const [examDuration, setExamDuration] = useState(chapter.exam_duration || 10);
  const [inputTitleChapterValue, setInputTitleChapterValue] = useState(chapter.title || '');
  const [inputDescrChapterValue, setInputDescrChapterValue] = useState(chapter.description || '');
  const handleInputChapterChange = (e) => {
    setInputTitleChapterValue(e.target.value);
  };


  const handleInputDescrChapterChange = (e) => {
    setInputDescrChapterValue(e.target.value);
  };

  const handleIsExamChange = (checked) => {
    setIsExam(checked);
};

const handleExamDurationChange = (value) => {
  setExamDuration(value);
};


  const AddModuleOpenModal = async () => {
    handleOpenModal()
  };
  const contentAddModuleToModal = () =>
  (
    <div>
      <h2>Вы добавляете модуль </h2>
      <p>Название модуля:</p>
      <TextInput isTextArea={false} placeholder={"Напишите сюда название модуля"} value={inputTitleValue} onChange={handleInputChange} />
      <p>Описание модуля:</p>
      <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />
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

    const updateChapter = async () => {
      const dataParams = {
        title: inputTitleChapterValue,
        description: inputDescrChapterValue,
        sort_index: 1,
        is_exam: isExam,
        exam_duration_minutes: isExam ? examDuration : null,
      };
      const response = await CourseEditorService.editCoursePageUpdateChapter(chapter.id, dataParams);
      if (response.status === 200 || response.status === 201) {
        // console.log(response.data)
        const updatedChapter = response.data.chapter;
        const updatedChapters = getChapters.map(chap => 
          chap.id === chapter.id ? updatedChapter : chap
        );
        setGetChapters(updatedChapters);
        // handleCloseModal();
      }
    };

    const deleteChapter = async () => {

      const response = await CourseEditorService.editCoursePageDeleteChapter(
        chapter.id
      );
      if (response.status === 200 || response.status === 201) {
        const updatedChapters = getChapters.filter(item => item.id !== chapter.id);
        setGetChapters(updatedChapters);
      }
    };
// console.log(chapter)
    return (
      <>
        <div style={{
          borderRadius: '10px',
          backgroundColor: '#e9e9e9',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
                  <p>Название главы:</p>
                  <TextInput isTextArea={false} placeholder={"Напишите сюда название главы"} value={inputTitleChapterValue} onChange={handleInputChapterChange} />
          <p>Описание главы:</p>
          <TextInput type={'textarea'} placeholder={"Напишите сюда описание главы"} value={inputDescrChapterValue} onChange={handleInputDescrChapterChange} />

        <p>Является ли ваша глава экзаменом?</p>
        <ReusableSwitch
            defaultChecked={isExam}
            onChange={handleIsExamChange}
        />
        {isExam && (
            <div>
                <p>Продолжительность экзамена (в часах):</p>
                <ReusableSliderWithInput
                    defaultValue={examDuration}
                    min={0}
                    max={48}
                    value={examDuration}
                    onChange={handleExamDurationChange}
                    style={{ marginBottom: '20px', width: '50%' }}
                    inputStyle={{ backgroundColor: '#f0f0f0' }}
                    sliderStyle={{ marginRight: '10px' }}
                />
            </div>
        )}
          <p>Название главы:</p>

          <LmsButton buttonText={"Обновить"} handleClick={updateChapter} />

        </div>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          padding: '10px'

        }}>
          <LmsButton
            buttonText={"Удалить раздел"}
            handleClick={deleteChapter}
          />
        </div>
      </>
    )
  }
  // console.log(chapter)
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

      <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentAddModuleToModal()} />
      <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={handlePopupClose} title={`Найстроки раздела: ${chapter.title}`} popupContent={popupContent()} />
      <div className="block__title"><p>{chapter.title}</p>
        <button {...listeners} className={"title__chapter-drag"}  >
          <DragVerticalIcon />
        </button></div>
      {/* <LmsButton buttonText={"Добавить модуль"} handleClick={(e) => addModule(chapter.id)} /> */}
      <LmsButton
        buttonText={"Добавить модуль"}
        handleClick={AddModuleOpenModal}
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