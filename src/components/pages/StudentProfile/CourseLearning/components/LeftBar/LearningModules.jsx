import React from 'react';

const Modules = ({
  title,
  id,
  module,
  activeModuleId,
  setActiveModuleId,
  isLocked,
  moduleChange // Получаем функцию moduleChange
}) => {
  const handleModuleClick = () => {
    if (!isLocked) {
      setActiveModuleId(id);
      moduleChange(module); // Вызываем moduleChange при клике
    }
  };

  return (
    <div
      className={`modules__block ${activeModuleId === id ? "active" : ""} ${isLocked ? "locked" : ""} ${module.is_completed ? "completed" : ""}`}
      onClick={handleModuleClick}
    >
      <p>{title}</p>
    </div>
  );
};

export default Modules;
