import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import LmsButton from "../../../../../reUseComponents/Button";
import { DragVerticalIcon } from '../../../../../icons/icons';
const SortableChapter = ({
  id,
  chapter,
  activeChapterId,
  setActiveChapterId,
  activeModuleId,
  setActiveModuleId,
  addModule,
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



  return (
<div
  {...attributes}
  ref={setNodeRef}
  style={{
    transition,
    transform: CSS.Translate.toString(transform),
  }}
  className={`chapters__block ${activeChapterId === chapter.id ? 'active' : ''}${
    isDragging ? 'opacity-50' : ''
  }`}
  key={chapter.sorted} 
  onClick={() => setActiveChapterId(chapter.id)}
>


       
<div className="block__title"><p>{chapter.title}</p>  
<button {...listeners} className={"title__menu"}  >
  <DragVerticalIcon  />
</button></div>
<LmsButton buttonText={"Добавить модуль"} handleClick={(e) => addModule(chapter.id)} />
<div className="chapters__modules">
    {/* {chapter.modules.map((module) => (
        <div key={module.id} className="modules__block" onClick={(e) => moduleChange(module)} >{module.title}</div>
    ))} */}
    {chapter.modules.map((module) => (
        <div
            key={module.id}
            className={`modules__block ${activeModuleId === module.id ? "active" : ""}`}
            onClick={() => {
                setActiveModuleId(module.id);
                moduleChange(module);
            }}
        >
            {module.title}
        </div>
    ))}
</div>
</div>

  );
}


export default SortableChapter;