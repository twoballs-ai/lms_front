import React from 'react';
import PropTypes from 'prop-types';
import { ClockCircleOutlined } from '@ant-design/icons'; // Иконка таймера

const Chapter = ({
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  chapter_is_completed,
}) => {
  const handleChapterClick = () => {
    setActiveChapterId(chapter.id);
  };

  return (
    <div
      className={`chapters__block ${activeChapterId === chapter.id ? "active" : ""} ${chapter_is_completed ? "completed" : ""}`}
      onClick={handleChapterClick}
    >
      <div className="block-left">
        <div className="block__title">
          <p>
            {chapter.title}
            {/* Если это экзамен, отображаем иконку таймера */}
            {chapter.is_exam &&  <span><ClockCircleOutlined /></span>}
          </p>
        </div>

        <div className="chapters__modules">
          {children}
        </div>
      </div>
    </div>
  );
};

Chapter.propTypes = {
  chapter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    is_exam: PropTypes.bool.isRequired, // Новое поле для проверки экзамена
  }).isRequired,
  children: PropTypes.node,
  activeChapterId: PropTypes.number,
  setActiveChapterId: PropTypes.func.isRequired,
  chapter_is_completed: PropTypes.bool.isRequired,
};

export default Chapter;
