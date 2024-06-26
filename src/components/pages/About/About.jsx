import React from "react";
import "./About.scss"; // Импортируем стили

function About() {
    return (
        <div className="about-container">
            <div className="about-card">
                <div className="about-content">
                    <h5>Немного о компании</h5>
                    <p>
                        Intellity code - сайт для изучения программирования.
                        Наша платформа предоставляет доступ к широкому спектру курсов
                        для начинающих и опытных разработчиков. Мы предлагаем учебные материалы
                        по различным языкам программирования, фреймворкам и технологиям.
                    </p>
                    <p>
                        Наша миссия - сделать обучение программированию доступным и интересным
                        для всех. Мы верим, что каждый человек способен научиться программировать
                        и добиться успеха в этой области. Присоединяйтесь к нашей платформе и начните
                        свой путь в мир программирования уже сегодня!
                    </p>
                    <p>
                        Система обучения Intellity code основана на интерактивных уроках,
                        практических заданиях и проектах. Наши курсы разработаны опытными
                        инструкторами и обновляются регулярно, чтобы соответствовать последним
                        тенденциям и требованиям индустрии.
                    </p>
                    <p>
                        Мы также предлагаем поддержку сообщества, где студенты могут общаться,
                        задавать вопросы и делиться своими успехами. Независимо от вашего уровня
                        подготовки, у нас найдется курс, который поможет вам достичь ваших целей.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
