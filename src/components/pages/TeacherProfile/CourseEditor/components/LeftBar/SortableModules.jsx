import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

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
      <div className="flex items-center justify-between">
        {title}
        <button
          className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
          {...listeners}
        >
          Drag Handle
        </button>
      </div>
    </div>
  );
};

export default SortableModules;