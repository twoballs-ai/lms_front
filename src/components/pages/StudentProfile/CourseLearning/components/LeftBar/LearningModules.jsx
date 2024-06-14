import React from 'react';
import PropTypes from 'prop-types';

const Modules = ({
  title,
  id,
  module,
  activeModuleId,
  setActiveModuleId,
  isLocked
}) => {
  const handleModuleClick = () => {
    if (!isLocked) {
      moduleChange(module);
      setActiveModuleId(id);
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

Modules.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  module: PropTypes.object.isRequired,
  activeModuleId: PropTypes.number,
  setActiveModuleId: PropTypes.func.isRequired,
  isLocked: PropTypes.bool.isRequired
};

export default Modules;
