import React from 'react';
import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';
// import './Modules.scss'; // Import the SCSS file for styling

const Modules = ({ module, activeModuleId, setActiveModuleId, moduleChange, isLocked }) => {
    const { id, title, is_completed } = module;

    return (
        <div
            className={`modules__block ${activeModuleId === id ? "active" : ""} ${isLocked ? "locked" : ""} ${is_completed ? "completed" : ""}`}
            onClick={() => {
                if (!isLocked) {
                    setActiveModuleId(id);
                    moduleChange(module);
                }
            }}
        >
            {title} {isLocked && <LockOutlined />}
        </div>
    );
};

Modules.propTypes = {
    module: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        is_completed: PropTypes.bool.isRequired,
    }).isRequired,
    activeModuleId: PropTypes.number,
    setActiveModuleId: PropTypes.func.isRequired,
    moduleChange: PropTypes.func.isRequired,
    isLocked: PropTypes.bool,
};

Modules.defaultProps = {
    isLocked: false,
};

export default Modules;
