import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "antd";
import { SettingOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import LmsButton from "@/components/reUseComponents/Button";
import { DragVerticalIcon } from "@/components/icons/icons";
import LmsModalBase from "@/components/reUseComponents/ModalBase";
import TextInput from "@/components/reUseComponents/TextInput";
import ChapterPopupMenu from "./utils/ChapterPopupMenu"; 
import { useDispatch } from "react-redux";
import { addModuleToChapter } from "@/store/slices/courseEditorChapterSlice";

interface Chapter {
  id: string;
  title: string;
  sort_index: number;
}

interface SortableChapterProps {
  id: string;
  chapter: Chapter;
  children: React.ReactNode;
  activeChapterId: string | null;
  setActiveChapterId: (id: string) => void;
  moveChapter: (id: string, direction: "up" | "down") => void;
  courseChapters: Chapter[];
}

const SortableChapter: React.FC<SortableChapterProps> = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  moveChapter,
  courseChapters,
}) => {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  console.log(courseChapters)
  const dispatch = useDispatch();
  const [handlePopupOpen, setHandlePopupOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState<string>("");
  const [inputDescrValue, setInputDescrValue] = useState<string>("");
  const [errors, setErrors] = useState<{ inputTitleValue?: string; inputDescrValue?: string }>({});

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputTitleValue("");
    setInputDescrValue("");
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputTitleValue(e.target.value);
  const handleInputDescrChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescrValue(e.target.value);

  const addModule = async () => {
    try {
      const dataParams = {
        chapter_id: chapter.id,
        title: inputTitleValue,
        description: inputDescrValue,
      };

      await dispatch(addModuleToChapter(dataParams)).unwrap();
      handleCloseModal();
    } catch (validationErrors: any) {
      const validationErrorsObj: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: { path: string; message: string }) => {
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
        zIndex: isDragging ? 9999 : 'auto',
      }}
      className={`chapters__block ${activeChapterId === chapter.id ? "active" : ""} ${isDragging ? "opacity-50" : ""}`}
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
              placeholder="Напишите сюда название модуля"
              value={inputTitleValue}
              onChange={handleInputChange}
            />
            {errors.inputTitleValue && <span className="error">{errors.inputTitleValue}</span>}
            <p>Описание модуля:</p>
            <TextInput
              isTextArea={true}
              placeholder="Напишите сюда описание модуля"
              value={inputDescrValue}
              onChange={handleInputDescrChange}
            />
            {errors.inputDescrValue && <span className="error">{errors.inputDescrValue}</span>}
            <LmsButton buttonText="Создать" handleClick={addModule} />
          </div>
        }
      />
      <ChapterPopupMenu chapter={chapter} handlePopupClose={handlePopupClose} handlePopupOpen={handlePopupOpen} />
      <div className="block-left">
        <div className="block__title">
          <p>{chapter.title}</p>
        </div>
        <LmsButton buttonText="Добавить модуль" handleClick={handleOpenModal} />
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
