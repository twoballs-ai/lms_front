import React, { useState } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Yup from 'yup';
import LmsButton from "../../../../../reUseComponents/Button";
import { DragVerticalIcon } from '../../../../../icons/icons';
import LmsModalBase from '../../../../../reUseComponents/ModalBase';
import TextInput from "../../../../../reUseComponents/TextInput";
import CourseEditorService from "../../../../../../services/course.editor.service";
import { SettingOutlined, DeleteOutlined, UpOutlined, DownOutlined, FieldTimeOutlined, LockOutlined } from '@ant-design/icons'; // Import the lock icon
import { Button } from "antd";
import PopupMenu from "../../../../../reUseComponents/PopupMenu";
import ReusableSwitch from "../../../../../reUseComponents/Switcher";
import ReusableSliderWithInput from "../../../../../reUseComponents/Slider";
import { useDispatch, useSelector } from 'react-redux';
import { deleteChapter, updateChapter, addModuleToChapter } from "../../../../../../store/slices/courseEditorChapterSlice";

const SortableChapter = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
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
  
  const dispatch = useDispatch();
  const [handlePopupOpen, setHandlePopupOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState('');
  const [inputDescrValue, setInputDescrValue] = useState('');
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    inputTitleValue: Yup.string().required('Введите название модуля'),
    inputDescrValue: Yup.string().required('Введите описание модуля'),
  });

  const showPopupMenu = () => setHandlePopupOpen(true);
  const handlePopupClose = () => setHandlePopupOpen(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputTitleValue('');
    setInputDescrValue('');
    setErrors({});
  };

  const handleInputChange = (e) => setInputTitleValue(e.target.value);
  const handleInputDescrChange = (e) => setInputDescrValue(e.target.value);

  const [isExam, setIsExam] = useState(chapter.is_exam || false);
  const [examDuration, setExamDuration] = useState(chapter.exam_duration || 10);
  const [inputTitleChapterValue, setInputTitleChapterValue] = useState(chapter.title || '');
  const [inputDescrChapterValue, setInputDescrChapterValue] = useState(chapter.description || '');

  const handleInputChapterChange = (e) => setInputTitleChapterValue(e.target.value);
  const handleInputDescrChapterChange = (e) => setInputDescrChapterValue(e.target.value);
  const handleIsExamChange = (checked) => setIsExam(checked);
  const handleExamDurationChange = (value) => setExamDuration(value);

  const AddModuleOpenModal = () => handleOpenModal();

  const contentAddModuleToModal = () => (
    <div>
      <h2>Вы добавляете модуль</h2>
      <p>Название модуля:</p>
      <TextInput isTextArea={false} placeholder={"Напишите сюда название модуля"} value={inputTitleValue} onChange={handleInputChange} />
      {errors.inputTitleValue && <span className="error">{errors.inputTitleValue}</span>}
      <p>Описание модуля:</p>
      <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />
      {errors.inputDescrValue && <span className="error">{errors.inputDescrValue}</span>}
      <LmsButton buttonText={"Создать"} handleClick={addModule} />
    </div>
  );

  const addModule = async () => {
    try {
      await schema.validate({
        inputTitleValue,
        inputDescrValue,
      }, { abortEarly: false });

      const newSortIndex = chapter.modules.length > 0
        ? Math.max(...chapter.modules.map(module => module.sort_index)) + 1
        : 0;

      const dataParams = {
        chapter_id: chapter.id,
        title: inputTitleValue,
        description: inputDescrValue,
        sort_index: newSortIndex,
      };

      await dispatch(addModuleToChapter(dataParams)).unwrap();
      handleCloseModal();
    } catch (validationErrors) {
      const validationErrorsObj = {};
      validationErrors.inner.forEach(error => {
        validationErrorsObj[error.path] = error.message;
      });
      setErrors(validationErrorsObj);
    }
  };

  const handleUpdateChapter = async () => {
    const dataParams = {
      id: chapter.id,
      title: inputTitleChapterValue,
      description: inputDescrChapterValue,
      sort_index: chapter.sort_index,
      is_exam: isExam,
      exam_duration_minutes: isExam ? examDuration : null,
    };
    await dispatch(updateChapter(dataParams)).unwrap();
  };

  const handleDeleteChapter = async () => {
    try {
      await dispatch(deleteChapter(chapter.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete chapter:', error);
    }
  };

  const popupContent = () => (
    <>
      <div style={{ borderRadius: '10px', backgroundColor: '#e9e9e9', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <p>Название главы:</p>
        <TextInput isTextArea={false} placeholder={"Напишите сюда название главы"} value={inputTitleChapterValue} onChange={handleInputChapterChange} />
        <p>Описание главы:</p>
        <TextInput type={'textarea'} placeholder={"Напишите сюда описание главы"} value={inputDescrChapterValue} onChange={handleInputDescrChapterChange} />
        <p>Является ли ваша глава экзаменом?</p>
        <ReusableSwitch defaultChecked={isExam} onChange={handleIsExamChange} />
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
        <LmsButton buttonText={"Обновить"} handleClick={handleUpdateChapter} />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
        <LmsButton buttonText={"Удалить раздел"} handleClick={handleDeleteChapter} />
      </div>
    </>
  );

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`chapters__block ${activeChapterId === chapter.id ? 'active' : ''}${isDragging ? 'opacity-50' : ''}`}
      key={chapter.sort_index}
      onClick={() => setActiveChapterId(chapter.id)}
    >
      <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentAddModuleToModal()} />
      <PopupMenu handlePopupOpen={handlePopupOpen} handlePopupClose={handlePopupClose} title={`Настройки раздела: ${chapter.title}`} popupContent={popupContent()} />
      <div className="block-left">
        <div className="block__title">
          <p>{chapter.title}</p>
          {chapter.is_exam && <FieldTimeOutlined />}
          {chapter.is_blocked && <LockOutlined />} {/* Conditionally render the lock icon */}
        </div>
        <LmsButton buttonText={"Добавить модуль"} handleClick={AddModuleOpenModal} />
        <div className="chapters__modules">
          {children}
        </div>
      </div>
      <div className="block-menu">
        <button className="block__chapter_menu" onClick={showPopupMenu}><SettingOutlined style={{ fontSize: '24px' }} /></button>
      </div>
    </div>
  );
};

export default SortableChapter;
