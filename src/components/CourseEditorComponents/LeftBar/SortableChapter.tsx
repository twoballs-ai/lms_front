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
import {
  fetchChapters,
  addModuleToChapter,
  updateModulesSortIndexes,
} from "@/store/slices/courseEditorChapterSlice";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableModules from "./SortableModules";

interface Chapter {
  id: string;
  title: string;
  sort_index: number;
  modules: Module[]; // Make sure you define the Module interface if it's not defined elsewhere
}

interface Module {
  id: string;
  title: string;
  sort_index: number;
}

interface SortableChapterProps {
  id: string;
  chapter: Chapter;
  setModuleEditData: (module: Module) => void;
  course_id: string;
  activeChapterId: string | null;
  setDraggingItemId: (id: string | null) => void;
  setActiveChapterId: (id: string) => void;
  moveChapter: (id: string, direction: "up" | "down") => void;
  courseChapters: Chapter[];
}

const SortableChapter: React.FC<SortableChapterProps> = ({
  id,
  chapter,
  setModuleEditData,
  course_id,
  activeChapterId,
  setDraggingItemId,
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
  const [inputTitleValue, setInputTitleValue] = useState<string>("");
  const [inputDescrValue, setInputDescrValue] = useState<string>("");
  const [errors, setErrors] = useState<{
    inputTitleValue?: string;
    inputDescrValue?: string;
  }>({});

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      axis: "y",
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputTitleValue("");
    setInputDescrValue("");
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputTitleValue(e.target.value);
  const handleInputDescrChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInputDescrValue(e.target.value);

  const addModule = async () => {
    try {
      const dataParams = {
        chapter_id: chapter.id,
        title: inputTitleValue,
        description: inputDescrValue,
      };

      await dispatch(addModuleToChapter(dataParams)).unwrap();
      handleCloseModal();
    } catch (error) {
      // Define a type for the validation error
      type ValidationError = {
        path: string;
        message: string;
      };

      const validationErrorsObj: { [key: string]: string } = {};
      if (error && error.inner) {
        (error.inner as ValidationError[]).forEach(
          (validationError: ValidationError) => {
            validationErrorsObj[validationError.path] = validationError.message;
          }
        );
      }
      setErrors(validationErrorsObj);
    }
  };

  const showPopupMenu = () => setHandlePopupOpen(true);
  const handlePopupClose = () => setHandlePopupClose(false);

  const moduleChange = (module: Module) => {
    setModuleEditData(module);
  };

  const handleMoveModule = async (chapterId: string, moduleId: string, direction: number) => {
    const chapterIndex = courseChapters.findIndex((chapter) => chapter.id === chapterId);
    if (chapterIndex === -1) return;

    // Create a new array for the chapters
    const updatedChapters = [...courseChapters];
    const modules = [...updatedChapters[chapterIndex].modules];
    const moduleIndex = modules.findIndex((module) => module.id === moduleId);

    const newIndex = moduleIndex + direction;

    if (newIndex < 0 || newIndex >= modules.length) return;

    // Create a new array for modules and move the module
    const newModules = [...modules];
    const [movedModule] = newModules.splice(moduleIndex, 1);
    newModules.splice(newIndex, 0, movedModule);

    // Update the modules in the specific chapter
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      modules: newModules.map((module, idx) => ({
        ...module,
        sort_index: idx + 1,
      })),
    };

    // Update the state to trigger a re-render
    dispatch(updateModulesSortIndexes({
      chapter_id: chapterId,
      modules: updatedChapters[chapterIndex].modules.map(module => ({
        id: module.id,
        sort_index: module.sort_index,
      })),
    })).then(() => {
      // Directly update the frontend state with the new order
      dispatch(fetchChapters(course_id));  // Refresh the chapters from the backend
    }).catch(error => {
      console.error("Failed to update module sort indexes:", error);
    });
  };

  const handleModuleDragEnd = (event: { active: { id: string }; over: { id: string } }, chapterId: string) => {
    setDraggingItemId(null);
    const { active, over } = event;
    const chapterIndex = courseChapters.findIndex((chapter) => chapter.id === chapterId);
    
    if (chapterIndex === -1 || !over) return;
    
    const modules = [...courseChapters[chapterIndex].modules];
    const activeIndex = modules.findIndex((module) => module.sort_index === active.id);
    const overIndex = modules.findIndex((module) => module.sort_index === over.id);
    
    if (activeIndex !== overIndex) {
      const [removedModule] = modules.splice(activeIndex, 1);
      modules.splice(overIndex, 0, removedModule);

      const updatedModules = modules.map((module, idx) => ({
        ...module,
        sort_index: idx + 1,
      }));

      dispatch(updateModulesSortIndexes({
        chapter_id: chapterId,
        modules: updatedModules.map(module => ({
          id: module.id,
          sort_index: module.sort_index,
        })),
      })).then(() => {
        dispatch(fetchChapters(course_id));
      }).catch(error => {
        console.error("Failed to update module sort indexes:", error);
      });
    }
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 9999 : "auto",
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
              placeholder="Напишите сюда название модуля"
              value={inputTitleValue}
              onChange={handleInputChange}
            />
            {errors.inputTitleValue && (
              <span className="error">{errors.inputTitleValue}</span>
            )}
            <p>Описание модуля:</p>
            <TextInput
              isTextArea={true}
              placeholder="Напишите сюда описание модуля"
              value={inputDescrValue}
              onChange={handleInputDescrChange}
            />
            {errors.inputDescrValue && (
              <span className="error">{errors.inputDescrValue}</span>
            )}
            <LmsButton buttonText="Создать" handleClick={addModule} />
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
        <LmsButton buttonText="Добавить модуль" handleClick={handleOpenModal} />
        <div className="chapters__modules">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={(event) => handleModuleDragEnd(event, chapter.id)}
          >
            <SortableContext
              items={chapter.modules.map((module) => module.sort_index)}
              strategy={verticalListSortingStrategy}
            >
              {chapter.modules
                .slice()
                .sort((a, b) => a.sort_index - b.sort_index)
                .map((module, index) => (
                  <SortableModules
                    title={module.title}
                    moduleChange={moduleChange}
                    id={module.sort_index}
                    key={module.sort_index}
                    module={module}
                    activeModuleId={activeModuleId}
                    setActiveModuleId={setActiveModuleId}
                    onMoveUp={() => handleMoveModule(chapter.id, module.id, -1)}
                    onMoveDown={() =>
                      handleMoveModule(chapter.id, module.id, 1)
                    }
                    isFirst={index === 0} // First module in the list
                    isLast={index === chapter.modules.length - 1} // Last module in the list
                  />
                ))}
            </SortableContext>
          </DndContext>
        </div>
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
