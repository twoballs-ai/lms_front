import React from 'react';
import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';

const Chapter = ({
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  isLocked,
  chapter_is_completed,
}) => {
  const handleChapterClick = () => {
    setActiveChapterId(chapter.id);
  };

  return (
    <div
      className={`chapters__block ${activeChapterId === chapter.id ? "active" : ""} ${chapter_is_completed ? "completed" : isLocked ? "locked" : ""}`}
      onClick={handleChapterClick}
    >
      <div className="block-left">
        <div className="block__title">
          <p>
            {chapter.title}
            {isLocked && !chapter_is_completed && <span><LockOutlined /></span>}
          </p>
        </div>

        <div className={`chapters__modules ${isLocked ? "locked" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

Chapter.propTypes = {
  chapter: PropTypes.object.isRequired,
  children: PropTypes.node,
  activeChapterId: PropTypes.number,
  setActiveChapterId: PropTypes.func.isRequired,
  isLocked: PropTypes.bool.isRequired,
  chapter_is_completed: PropTypes.bool.isRequired,
};

export default Chapter;
