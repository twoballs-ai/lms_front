import React, { useEffect, useState } from "react";

const SortableChapter = ({
  id,
  chapter,
  children,
  activeChapterId,
  setActiveChapterId,
  getChapters,
  setGetChapters,
}) => {

  return (
    <div

      className={`chapters__block ${activeChapterId === chapter.id ? 'active' : ''}`}
      key={chapter.sort_index}
      onClick={() => setActiveChapterId(chapter.id)}
    >

      <div className="block__title"><p>{chapter.title}</p></div>

      <div className="chapters__modules">

        {children}
      </div>
    </div>

  );
}


export default SortableChapter;