import React from 'react';
import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';

const Chapter = ({
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  isLocked,
  isCompleted,
  onExamComplete,
}) => {
  const handleChapterClick = () => {
    if (!isLocked) {
      setActiveChapterId(chapter.id);
    }
  };

  return (
    <div
      className={`chapters__block ${activeChapterId === chapter.id ? "active" : ""} ${isLocked ? "locked" : ""}`}
      onClick={handleChapterClick}
    >
      <div className="block-left">
        <div className="block__title">
          <p>
            {chapter.title} {isCompleted && <span>(Пройдено)</span>}{" "}
            {isLocked && <span><LockOutlined /></span>}
          </p>
        </div>

        <div className="chapters__modules">
          {activeChapterId === chapter.id && !isLocked && (
            <>
              {chapter.is_exam && !isCompleted && (
                <button onClick={() => onExamComplete(chapter.id)}>Сдать экзамен</button>
              )}
            </>
          )}
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
  isCompleted: PropTypes.bool.isRequired,
  onExamComplete: PropTypes.func.isRequired,
};

export default Chapter;
