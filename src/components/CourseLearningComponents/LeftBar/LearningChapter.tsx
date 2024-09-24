import React from 'react';
import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';

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
            {chapter.is_locked && !chapter_is_completed && <span><LockOutlined /></span>}
          </p>
        </div>

        <div className={`chapters__modules ${chapter.is_locked ? "locked" : ""}`}>
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
    is_locked: PropTypes.bool.isRequired, // Keep this in case you still need it
  }).isRequired,
  children: PropTypes.node,
  activeChapterId: PropTypes.number,
  setActiveChapterId: PropTypes.func.isRequired,
  chapter_is_completed: PropTypes.bool.isRequired,
};

export default Chapter;
