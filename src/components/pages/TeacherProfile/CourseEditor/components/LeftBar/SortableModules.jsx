import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DragVerticalIcon } from '../../../../../icons/icons';

const SortableModules = ({ id, title, module,moduleChange, activeModuleId, setActiveModuleId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });


  return (



//     <div
                                                   
//     className={`modules__block ${activeModuleId === module.id ? "active" : ""}`}
//     onClick={() => {
//         setActiveModuleId(module.id);
//         moduleChange(module);
//     }}
// >

// </div>

    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`modules__block ${activeModuleId === id ? "active" : ""}${isDragging ? 'opacity-50' : ''}`}   
          onClick={() => {
        setActiveModuleId(module.id);
        moduleChange(module);
    }}  
    >
 
        {title}
        <button {...listeners} className={"block__module-drag"}  >
          <DragVerticalIcon />
        </button>

    </div>
  );
};

export default SortableModules;