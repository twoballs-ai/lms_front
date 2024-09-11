"use client"; // Required for client-side rendering in Next.js

import React, { useEffect } from 'react';
import "./About.scss"; // Import your SCSS styles

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'О компании Courserio'; // Update the document title
  }, []);

  return (
    <div className="about-container">
      <div className="about-card">
        <div className="about-content">
          <section>
            <h1>О компании Courserio</h1>
            <p>
              <strong>Courserio</strong> — это ведущая
              онлайн-платформа для изучения программирования,
              которая предоставляет доступ к множеству курсов для
              начинающих и опытных разработчиков. Наша платформа
              предлагает интерактивные уроки и практические
              задания по различным{" "}
              <strong>языкам программирования</strong>,
              фреймворкам и технологиям.
            </p>

            <h2>Наша миссия</h2>
            <p>
              Сделать обучение программированию доступным и
              увлекательным для всех. Мы убеждены, что каждый
              может научиться программировать и достичь успеха в
              IT-индустрии. Присоединяйтесь к платформе{" "}
              <strong>Courserio</strong> и начните свой путь в мир
              программирования уже сегодня!
            </p>

            <h2>Преимущества Courserio</h2>
            <ul>
              <li>
                <strong>Интерактивные курсы:</strong> Все наши
                учебные материалы разработаны опытными
                инструкторами и регулярно обновляются, чтобы
                соответствовать последним тенденциям в IT.
              </li>
              <li>
                <strong>Практические задания и проекты:</strong>{" "}
                В процессе обучения вы будете решать реальные
                задачи, которые помогут вам закрепить полученные
                знания.
              </li>
              <li>
                <strong>Поддержка сообщества:</strong> У нас вы
                найдете сообщество единомышленников, где можно
                задавать вопросы, получать советы и делиться
                успехами.
              </li>
            </ul>

            <p>
              Независимо от вашего уровня подготовки,{" "}
              <strong>Courserio</strong> поможет вам достичь своих
              целей в мире программирования. Начните свое обучение
              сегодня и станьте востребованным разработчиком
              вместе с <strong>Courserio</strong>!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;