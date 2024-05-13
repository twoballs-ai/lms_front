import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import {
    DndContext,
    // DragMoveEvent,
    // DragOverlay,
    // DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    // UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors,

  } from '@dnd-kit/core';
// import { DragEndEvent } from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
// import {SortableItem} from './SortableItem';
// import LeftBar from "./LeftBar";
import "../MainComponent.scss"
import { apiLmsUrl } from "../../../../../../shared/config";
import LmsButton from "../../../../../reUseComponents/Button";
import EditModuleStage from "../../FullCourseEdit/EditModuleStage";
import CourseEditorService from "../../../../../../services/course.editor.service";
import SortableChapter from "./SortableChapter";

function CourseEditor() {
    const { course_id } = useParams();
    const [getChapters, setGetChapters] = useState([])
    const [moduleEditData, setModuleEditData] = useState([])
    const [activeChapterId, setActiveChapterId] = useState(null); // Состояние для хранения ID активной главы
    const [activeModuleId, setActiveModuleId] = useState(null); // Состояние для хранения ID активного модуля
    const sensors = useSensors(
        useSensor(PointerSensor,{
            // Установите ось перемещения как вертикальную
            axis: 'y',
          }),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      );
    
      const handleDragStart = (event) => {};
      const handleDragMove = (event) => {};
      const handleDragEnd = (event) => {};

    useEffect(() => {

        const fetchData = async () => {
            await CourseEditorService.editCoursePageGetChapterList(course_id).then((response) => {
                // console.log(response)
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data.data)
                    setGetChapters(response.data.data)
                }
            });
        };
        fetchData()
    }, []);

    const addChapter = async (e) => {
        // console.log("123")
        const dataParams = {
            course_id: course_id,
            title: "новая глава",
            description: "очередная новая глава"
        }
        const response = await CourseEditorService.editCoursePageAddChapter(dataParams)
        if (response.status === 200 || response.status === 201) {
            const newData = [...getChapters, response.data.chapters];
            setGetChapters(newData);
        }
    };
    const addModule = async (chapter_id) => {
        // console.log("123")
        const dataParams = {
            chapter_id: chapter_id,
            title: "новая модуль",
            description: "очередной новый модуль"
        }
        const response = await CourseEditorService.editCoursePageAddModule(dataParams)
        if (response.status === 200 || response.status === 201) {
            const newModule = response.data.modules;

            const newData = [...getChapters];
            const existingChapter = newData.find(chapter => chapter.id === newModule.chapter_id);

            if (existingChapter) {
                // Если глава существует, добавляем новый модуль к массиву модулей главы
                existingChapter.modules.push(newModule);
            }

            setGetChapters(newData);
        }
    };
    const moduleChange = (module) => {
        setModuleEditData(module)
    }




    return (

        <div className="course-edit__container">
                        <DndContext
  sensors={sensors}
  collisionDetection={closestCorners}
  onDragStart={handleDragStart}
  onDragMove={handleDragMove}
  onDragEnd={handleDragEnd}
          >
                    <SortableContext  items={getChapters.map(chapter => chapter.sorted)}
                    strategy={verticalListSortingStrategy}
                    >
            <div className="container__leftbar">

                <div className="leftbar__chapters">
                    <LmsButton buttonText={"Добавить раздел"} handleClick={addChapter} />

                    {getChapters.map((chapter) => (



<SortableChapter
id= {chapter.id} 
key={chapter.sorted} // Убедитесь, что уникальный ключ присутствует
chapter={chapter}
activeChapterId={activeChapterId}
setActiveChapterId={setActiveChapterId}
activeModuleId={activeModuleId}
setActiveModuleId={setActiveModuleId}
addModule={addModule}
moduleChange={moduleChange}
/>
))}


                </div>

            </div>
            </SortableContext>
                    </DndContext>
            <div className="container__main">
                {Object.keys(moduleEditData).length > 0 && (

                    <EditModuleStage moduleEditData={moduleEditData} />

                )}


            </div>
        </div>

    );
}

export default CourseEditor;