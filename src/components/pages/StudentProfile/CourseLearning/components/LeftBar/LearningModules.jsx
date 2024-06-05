import React from 'react';


const Modules = ({ id, title, module,moduleChange, activeModuleId, setActiveModuleId }) => {

  return (
    <div
      className={`modules__block ${activeModuleId === id ? "active" : ""}`}   
          onClick={() => {
        setActiveModuleId(module.id);
        moduleChange(module);
    }}  
    >
        {title}
    </div>
  );
};

export default Modules;