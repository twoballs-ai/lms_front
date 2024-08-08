// src/components/SortableChapter.js

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "antd";
import { SettingOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import LmsButton from "../../../../../reUseComponents/Button";
import { DragVerticalIcon } from "../../../../../icons/icons";
import LmsModalBase from "../../../../../reUseComponents/ModalBase";
import TextInput from "../../../../../reUseComponents/TextInput";
import ChapterPopupMenu from "./utils/ChapterPopupMenu"; // Import the new component
import { useDispatch } from "react-redux";
import { addModuleToChapter } from "../../../../../../store/slices/courseEditorChapterSlice";

const SortableChapter = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  moveChapter,
  courseChapters,
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
          type: "container",
      },
  });

  const dispatch = useDispatch();
  const [handlePopupOpen, setHandlePopupOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputDescrValue, setInputDescrValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
      setOpenModal(false);
      setInputTitleValue("");
      setInputDescrValue("");
      setErrors({});
  };

  const handleInputChange = (e) => setInputTitleValue(e.target.value);
  const handleInputDescrChange = (e) => setInputDescrValue(e.target.value);

  const addModule = async () => {
    try {
        const dataParams = {
            chapter_id: chapter.id,
            title: inputTitleValue,
            description: inputDescrValue,
        };

        await dispatch(addModuleToChapter(dataParams)).unwrap();
        handleCloseModal();
    } catch (validationErrors) {
        const validationErrorsObj = {};
        validationErrors.inner.forEach((error) => {
            validationErrorsObj[error.path] = error.message;
        });
        setErrors(validationErrorsObj);
    }
};

  const showPopupMenu = () => setHandlePopupOpen(true);
  const handlePopupClose = () => setHandlePopupOpen(false);

  return (
      <div
          {...attributes}
          ref={setNodeRef}
          style={{
              transition,
              transform: CSS.Translate.toString(transform),
              zIndex: isDragging ? 9999 : 'auto', // Ensure dragged item is on top
          }}
          className={`chapters__block ${
              activeChapterId === chapter.id ? "active" : ""
          } ${isDragging ? "opacity-50" : ""}`}
          key={chapter.sort_index}
          onClick={() => setActiveChapterId(chapter.id)}
      >
          <LmsModalBase
              open={openModal}
              onClose={handleCloseModal}
              content={
                  <div>
                      <h2>Вы добавляете модуль</h2>
                      <p>Название модуля:</p>
                      <TextInput
                          isTextArea={false}
                          placeholder={"Напишите сюда название модуля"}
                          value={inputTitleValue}
                          onChange={handleInputChange}
                      />
                      {errors.inputTitleValue && (
                          <span className="error">{errors.inputTitleValue}</span>
                      )}
                      <p>Описание модуля:</p>
                      <TextInput
                          type={"textarea"}
                          placeholder={"Напишите сюда описание модуля"}
                          value={inputDescrValue}
                          onChange={handleInputDescrChange}
                      />
                      {errors.inputDescrValue && (
                          <span className="error">{errors.inputDescrValue}</span>
                      )}
                      <LmsButton buttonText={"Создать"} handleClick={addModule} />
                  </div>
              }
          />
          <ChapterPopupMenu
              chapter={chapter}
              handlePopupClose={handlePopupClose}
              handlePopupOpen={handlePopupOpen}
          />
          <div className="block-left">
              <div className="block__title">
                  <p>{chapter.title}</p>
              </div>
              <LmsButton
                  buttonText={"Добавить модуль"}
                  handleClick={handleOpenModal}
              />
              <div className="chapters__modules">{children}</div>
          </div>
          <div className="block-menu">
              <div className="controls">
                  <Button
                      type="text"
                      icon={<UpOutlined />}
                      onClick={() => moveChapter(chapter.id, "up")}
                      disabled={chapter.sort_index === 1}
                  />
                  <button {...listeners} className="title__chapter-drag">
                      <DragVerticalIcon />
                  </button>
                  <Button
                      type="text"
                      icon={<DownOutlined />}
                      onClick={() => moveChapter(chapter.id, "down")}
                      disabled={chapter.sort_index === courseChapters.length}
                  />
              </div>
              <button className="block__chapter_menu" onClick={showPopupMenu}>
                  <SettingOutlined style={{ fontSize: "24px" }} />
              </button>
          </div>
      </div>
  );
};

export default SortableChapter;