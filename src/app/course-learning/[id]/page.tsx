"use client"; // This directive must be at the top
import React, { useEffect, useState } from "react";

import "./CourseLearning.scss";
import StudentService from "@/services/student.service";
import Chapter from "@/components/CourseLearningComponents/LeftBar/LearningChapter";
import Modules from "@/components/CourseLearningComponents/LeftBar/LearningModules";
import ModuleStageLearn from "@/components/CourseLearningComponents/FullCoursePassing/ModuleStageLearn";
import { useParams } from "next/navigation";

// Define types for your chapter and module data
interface Module {
  id: number;
  title: string;
  is_completed: boolean;
  is_locked: boolean;
}

interface ChapterType {
  id: number;
  title: string;
  chapter_is_completed: boolean;
  is_locked: boolean;
  is_exam: boolean;
  modules: Module[];
}

const CourseLearning: React.FC = () => {
    const params = useParams();
    const course_id = params.id; 
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [moduleEditData, setModuleEditData] = useState<Module | {}>({});
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [showExamPrompt, setShowExamPrompt] = useState<boolean>(false);
  const [allCompleted, setAllCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (course_id) {
      fetchChapters();
    }
  }, [course_id]);

  const fetchChapters = async () => {
    try {
      const response = await StudentService.learnCoursePageGetChapterList(course_id);
      if (response.status === 200 || response.status === 201) {
        const fetchedChapters: ChapterType[] = response.data.data;
        console.log(fetchedChapters);
        setChapters(fetchedChapters);
        const [firstIncompleteChapter, firstIncompleteModule] = findFirstIncomplete(fetchedChapters);
        setActiveChapterId(firstIncompleteChapter);
        setActiveModuleId(firstIncompleteModule);
        setModuleEditData(
          firstIncompleteModule ? fetchedChapters.find(ch => ch.id === firstIncompleteChapter)?.modules.find(m => m.id === firstIncompleteModule) || {} : {}
        );

        checkCompletionStatus(fetchedChapters);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const findFirstIncomplete = (chapters: ChapterType[]): [number | null, number | null] => {
    for (let i = 0; i < chapters.length; i++) {
      if (!chapters[i].chapter_is_completed && !chapters[i].is_locked) {
        const module = chapters[i].modules.find(module => !module.is_completed);
        if (module) return [chapters[i].id, module.id];
      }
    }
    return [null, null];
  };

  const checkCompletionStatus = (chapters: ChapterType[]) => {
    const allChaptersAndModulesCompleted = chapters.every(ch => ch.chapter_is_completed && ch.modules.every(m => m.is_completed));
    setAllCompleted(allChaptersAndModulesCompleted);

    const examChapterIndex = chapters.findIndex(ch => ch.is_exam);

    if (examChapterIndex !== -1) {
      const allChaptersBeforeExamCompleted = chapters.slice(0, examChapterIndex).every(ch => ch.chapter_is_completed);
      setShowExamPrompt(allChaptersBeforeExamCompleted && !allChaptersAndModulesCompleted);
    } else {
      setShowExamPrompt(false);
    }
  };

  const setNextModuleAndChapter = (nextChapterId: number, nextModuleId: number) => {
    setActiveChapterId(nextChapterId);
    setActiveModuleId(nextModuleId);
    const nextModule = chapters.find(ch => ch.id === nextChapterId)?.modules.find(m => m.id === nextModuleId);
    setModuleEditData(nextModule || {});
  };

  const handleStartExam = async () => {
    const examChapter = chapters.find(ch => ch.is_exam);
    if (examChapter) {
      try {
        const response = await StudentService.startExam(examChapter.id);
        if (response.status === 200 || response.status === 201) {
          fetchChapters();
          setShowExamPrompt(false);
        } else {
          console.error("Failed to start exam:", response.data.message);
        }
      } catch (error) {
        console.error("Error starting exam:", error.message);
      }
    }
  };

  // Function to handle module data changes
  const moduleChange = (module: Module) => {
    setModuleEditData(module);
  };

  return (
    <div className="course-learn__container">
      <div className="container__leftbar">
        <div className="leftbar__chapters">
          {chapters.map((chapter) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              activeChapterId={activeChapterId}
              setActiveChapterId={setActiveChapterId}
              isLocked={chapter.is_locked}
              chapter_is_completed={chapter.chapter_is_completed}
            >
              {chapter.modules.map((module) => (
                <Modules
                  key={module.id}
                  title={module.title}
                  id={module.id}
                  module={module}
                  activeModuleId={activeModuleId}
                  setActiveModuleId={setActiveModuleId}
                  isLocked={module.is_locked}
                  moduleChange={moduleChange} // Pass the moduleChange function
                />
              ))}
            </Chapter>
          ))}
        </div>
      </div>
      <div className="container__learn-main">
        {Object.keys(moduleEditData).length > 0 && !allCompleted && (
          <ModuleStageLearn
            moduleEditData={moduleEditData as Module}
            setModuleEditData={setModuleEditData}
            chapters={chapters}
            setChapters={setChapters}
            setNextModuleAndChapter={setNextModuleAndChapter}
            course_id={course_id}
            setShowExamPrompt={setShowExamPrompt}
            checkCompletionStatus={checkCompletionStatus}
          />
        )}

        {showExamPrompt && !allCompleted && (
          <div className="exam-prompt">
            <p>Все предыдущие главы завершены. Готовы начать экзамен?</p>
            <button onClick={handleStartExam}>Начать экзамен</button>
          </div>
        )}

        {allCompleted && (
          <div className="congratulations">
            <p>Поздравляем! Вы прошли все уроки курса.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLearning;
