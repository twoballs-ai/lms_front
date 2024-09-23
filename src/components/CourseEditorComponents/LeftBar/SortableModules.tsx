import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { DragVerticalIcon } from '@/components/icons/icons';
import { Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

interface Module {
  id: string;
  title: string;
  sort_index: number;
  // Другие возможные свойства модуля
}

interface SortableModulesProps {
  id: number; // Здесь используется sort_index, который является числом
  title: string;
  module: Module;
  moduleChange: (module: Module) => void;
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SortableModules: React.FC<SortableModulesProps> = ({
  id,
  title,
  module,
  moduleChange,
  activeModuleId,
  setActiveModuleId,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'item',
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`modules__block ${activeModuleId === module.id ? "active" : ""}${isDragging ? ' opacity-50' : ''}`}   
      onClick={() => {
        setActiveModuleId(module.id);
        moduleChange(module);
      }}  
    >
      <div className="module__content">
        <div className="controls">
          <button {...listeners} className="title__module-drag">
            <DragVerticalIcon />
          </button>
          <Button
            type="text"
            icon={<UpOutlined />}
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            disabled={isFirst}
          />
          <Button
            type="text"
            icon={<DownOutlined />}
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            disabled={isLast}
          />
        </div>
        {title}
      </div>
    </div>
  );
};

export default SortableModules;
