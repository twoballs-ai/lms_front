"use client"; // Required for client-side rendering in Next.js
import React, { useCallback, useEffect, useState } from "react";
import "./CourseLearning.scss";
import StudentService from "@/services/student.service";
import Chapter from "@/components/CourseLearningComponents/LeftBar/LearningChapter";
import Modules from "@/components/CourseLearningComponents/LeftBar/LearningModules";
import ModuleStageLearn from "@/components/CourseLearningComponents/FullCoursePassing/ModuleStageLearn";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import LmsButton from "@/components/reUseComponents/LmsButton";

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
  const [moduleEditData, setModuleEditData] = useState<Module | Record<string, never>>({});
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [showExamPrompt, setShowExamPrompt] = useState<boolean>(false);
  const [allCompleted, setAllCompleted] = useState<boolean>(false);

  const fetchChapters = useCallback(async () => {
    if (!course_id) return;

    try {
      const response = await StudentService.learnCoursePageGetChapterList(course_id);
      if (response.status === 200 || response.status === 201) {
        const fetchedChapters: ChapterType[] = response.data.data;

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
  }, [course_id]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const findFirstIncomplete = (chapters: ChapterType[]): [number | null, number | null] => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].is_exam) {
        // Возвращаем главу экзамена и первый модуль
        return [chapters[i].id, chapters[i].modules[0].id];
      }
      
      if (!chapters[i].chapter_is_completed && !chapters[i].is_locked) {
        const incompleteModule = chapters[i].modules.find(mod => !mod.is_completed);
        if (incompleteModule) return [chapters[i].id, incompleteModule.id];
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

  const handleStartExam = async (chapterId: number) => {
    const currentExam = chapters.find(ch => ch.is_exam && ch.id === chapterId);
  
    if (!currentExam) return;
  
    // Проверка на наличие другого активного незавершенного экзамена
    const previousExam = chapters.find(ch => ch.is_exam && ch.id !== chapterId && ch.exam_status?.exam_in_progress);
  
    if (previousExam && !previousExam.exam_status?.exam_completed) {
      alert("Вы еще не завершили предыдущий экзамен.");
      return;
    }
  
    try {
      const response = await StudentService.startExam(currentExam.id);
      if (response.status === 200 || response.status === 201) {
        // Обновляем главы после старта экзамена
        await fetchChapters();
  
        // Устанавливаем текущую экзаменационную главу и модуль только после завершения fetchChapters
        const updatedExam = chapters.find(ch => ch.is_exam && ch.id === chapterId);
        setActiveChapterId(updatedExam?.id || null);
        setActiveModuleId(updatedExam?.modules.length ? updatedExam.modules[0].id : null);
        setModuleEditData(updatedExam?.modules[0] || {});
  
        setShowExamPrompt(false); // Скрываем сообщение о начале экзамена
      } else {
        console.error("Не удалось начать экзамен:", response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при начале экзамена:", error.message);
    }
  };
  

  const moduleChange = (module: Module) => {
    setModuleEditData(module);
  };
  // New useEffect to send request on activeChapterId change
  useEffect(() => {
    const sendChapterChangeRequest = async () => {
      // Найти активную главу по ее id
      const activeChapter = chapters.find(chapter => chapter.id === activeChapterId);

      // Проверка, что активная глава не заблокирована
      if (activeChapter && activeChapter.is_locked) {
        console.log("Глава заблокирована, запрос не отправляется.");
        return; // Если глава заблокирована, выходим из функции
      }
      if (activeChapterId !== null) {
        try {
          const response = await StudentService.chapterStart(activeChapterId);
          if (response.status === 200 || response.status === 201) {
            console.log("Запрос на смену главы выполнен успешно", response.data);
          } else {
            console.error("Не удалось сменить главу:", response.data.message);
          }
        } catch (error) {
          console.error("Ошибка при смене главы:", error.message);
        }
      }
    };
  
    sendChapterChangeRequest();
  }, [activeChapterId, chapters]); 

  // Get the active chapter based on activeChapterId
  const activeChapter = chapters.find(chapter => chapter.id === activeChapterId);

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
              chapter_is_completed={chapter.chapter_is_completed}
              handleStartExam={handleStartExam}
              showExamPrompt={showExamPrompt}
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
                  moduleChange={moduleChange}
                />
              ))}
            </Chapter>
          ))}
        </div>
      </div>

      <div className="container__learn-main">
        {allCompleted && (
          <div className="congratulations">
            <p>Поздравляем! Вы прошли все уроки курса.</p>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        )}

        {/* If the active chapter is locked and it's an exam, show the exam start prompt */}
        {activeChapter && activeChapter.is_locked && activeChapter.is_exam && (
  <div className="exam-prompt">
    <FontAwesomeIcon icon={faClock} className="exam-icon" />
    {chapters.some(ch => ch.is_exam && ch.exam_status?.exam_in_progress && !ch.exam_status?.exam_completed) ? (
      <p>Вы еще не закончили предыдущий экзамен.</p>
    ) : (
      <LmsButton buttonText={"Начать экзамен"} handleClick={() => handleStartExam(activeChapter.id)} />
    )}
  </div>
)}

        {/* If there is module edit data, show the ModuleStageLearn */}
{Object.keys(moduleEditData).length > 0 && activeModuleId && activeChapterId && !activeChapter?.is_locked && (
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
      </div>
    </div>
  );
};

export default CourseLearning;
