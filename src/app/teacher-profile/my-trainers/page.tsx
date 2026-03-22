"use client";
import React, { useState, useEffect } from 'react';
import TeacherService from '@/services/teacher.service';
import './MyTeacherTrainers.scss';
import LmsButton from '@/components/reUseComponents/LmsButton';
import { useRouter } from 'next/navigation';

// Тип тренажера
interface Trainer {
  id: number;
  title: string;
  category: string;
  status: string;
  difficulty_level: string;
}

const MyTrainerCourses: React.FC = () => {
  const [trainerData, setTrainerData] = useState<Trainer[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    document.title = 'Профиль учителя - мои тренажеры - coursero.ru';
  }, []);

  const fetchData = async () => {
    try {
      const response = await TeacherService.getTeacherTasks();
      if (response.status === 200 || response.status === 201) {
        // response.data — это уже массив, поэтому просто setTrainerData(response.data)
        setTrainerData(response.data);
      }
    } catch (error) {
      console.error("Ошибка при получении данных тренажеров:", error);
    }
  };

  const handleDeleteClick = async (trainer_id: number) => {
    try {
      const response = await TeacherService.deleteTrainer(trainer_id);
      if (response.status === 200 || response.status === 201) {
        fetchData(); // обновляем список после удаления
      }
    } catch (error) {
      console.error("Ошибка при удалении тренажера:", error);
    }
  };

  const handleEditClick = (trainer_id: number) => {
    router.push(`/trainer-editor/${trainer_id}`);
  };

  const handleViewTestsClick = (trainer_id: number) => {
    router.push(`/trainer-tests/${trainer_id}`);
  };

  return (
    <div className="my-courses-container">
      <div className="my-courses-container__title">Мои тренажеры</div>

      {trainerData.length === 0 ? (
        <p>Тренажеров пока нет.</p>
      ) : (
        trainerData.map((trainer) => (
          <div key={trainer.id} className="my-courses-container__course-item">
            <div className="course-item__course-title">
              {trainer.question /* или trainer.title, если есть title */}
              <p>Категория: {trainer.language.name}</p>
              <p>Статус: {trainer.status_id}</p>
              <p>Сложность: {trainer.difficulty_level}</p>
            </div>

            <div className="course-item__course-actions">
              <LmsButton buttonText="Редактировать" handleClick={() => handleEditClick(trainer.id)} />
              <LmsButton buttonText="Тесты" handleClick={() => handleViewTestsClick(trainer.id)} />
              <LmsButton buttonText="Удалить" handleClick={() => handleDeleteClick(trainer.id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTrainerCourses;