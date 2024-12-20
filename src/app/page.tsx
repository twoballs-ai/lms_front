"use client"; // Для клиентской отрисовки в Next.js
import React, { useState, useEffect } from "react";
import SiteService from "@/services/siteNoAuth.service";
import NewAddedCourse from "@/components/HomeComponents/NewAddedCourse";
import LatestNews from "@/components/HomeComponents/LatestNews";
import "./app.scss"; // Стили остаются

interface Course {
  id: number;
  title: string;
  description: string;
  cover_path: string;
}

export default function Home() {
  const [lastAddedCourses, setLastAddedCourses] = useState<Course[]>([]);
  const [teacherId, setTeacherId] = useState<boolean>(false);
  const items = "8";

  useEffect(() => {
    document.title = "Courserio - Lms - цифровая платформа обучения";
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      setTeacherId(true);
    }
  }, [teacherId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SiteService.homePageLastAddedCourses({ items });
        if (response.status === 200 || response.status === 201) {
          setLastAddedCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main-container__home-container">
      {/* Hero-блок */}
      <div className="home-container__hero-block">
        <h1 className="hero-block__hero-title">
          Добро пожаловать в Courserio LMS
        </h1>
        <p className="hero-block__hero-subtitle">
          Цифровая платформа для качественного дистанционного обучения.
          Получайте новые знания, повышайте квалификацию и делитесь опытом.
        </p>
        <button className="hero-block__hero-cta">Начать обучение</button>
      </div>

      {/* Блок "Почему мы?" */}
      <div className="home-container__why-us">
        <h2 className="why-us__section-title">Почему выбрать нас?</h2>
        <div className="why-us__features-list">
          <div className="features-list__feature-item">
            <span className="feature-item__feature-icon">🎓</span>
            <h3 className="feature-item__feature-title">Качественные курсы</h3>
            <p className="feature-item__feature-desc">
              Все курсы проходят отбор и регулярно обновляются.
            </p>
          </div>
          <div className="features-list__feature-item">
            <span className="feature-item__feature-icon">⏰</span>
            <h3 className="feature-item__feature-title">Гибкий график</h3>
            <p className="feature-item__feature-desc">
              Учитесь в удобное время и месте, в собственном темпе.
            </p>
          </div>
          <div className="features-list__feature-item">
            <span className="feature-item__feature-icon">👩‍🏫</span>
            <h3 className="feature-item__feature-title">
              Поддержка наставников
            </h3>
            <p className="feature-item__feature-desc">
              Наши преподаватели помогут вам в освоении материала.
            </p>
          </div>
          <div className="features-list__feature-item">
            <span className="feature-item__feature-icon">📜</span>
            <h3 className="feature-item__feature-title">Сертификаты</h3>
            <p className="feature-item__feature-desc">
              Получайте официальные подтверждения ваших навыков.
            </p>
          </div>
        </div>
      </div>

      {/* Недавно добавленные курсы */}
      <p className="home-container__section-subtitle">
        Недавно добавленные курсы
      </p>
      <NewAddedCourse lastAddedCourses={lastAddedCourses} />

      <hr className="home-container__custom-hr" />

      {/* Последние новости */}
      <p className="main-container__section-subtitle">Последние новости</p>
      <LatestNews />

      <hr className="home-container__custom-hr" />

      {/* Дополнительный блок с инфо о сообществе */}
      <div className="home-container__community-info">
        <h2 className="community-info__section-title">
          Присоединяйтесь к нашему сообществу
        </h2>
        <p className="community-info__community-desc">
          Courserio - это не просто платформа, это живое сообщество учащихся и
          преподавателей. Обменивайтесь опытом, задавайте вопросы и растите
          вместе с нами.
        </p>
        <button className="community-info__secondary-btn">Узнать больше</button>
      </div>
    </div>
  );
}
