import React from 'react';
import { DragVerticalIcon } from '../../../../../icons/icons';

const SortableModules = ({ id, title, module,moduleChange, activeModuleId, setActiveModuleId }) => {


  return (
    <div
      className={`modules__block ${activeModuleId === id ? "active" : ""}`}   
          onClick={() => {
        setActiveModuleId(module.id);
        moduleChange(module);
    }}  
    >
        {title}
        <button className={"block__module-drag"}  >
        </button>

    </div>
  );
};

export default SortableModules;