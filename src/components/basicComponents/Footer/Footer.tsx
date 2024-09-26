"use client"; // This directive must be at the top
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVk, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";
import Link from 'next/link'

function Footer() {
  return (
    <footer>
      <div className="footer__container">
        <div className="container__logo">
          2024. courserio, LMS - современная система обучения.
        </div>
        <div className="container__links">
          <p>Ссылки</p>
          <Link href="/license" className="nav-link">Пользовательское соглашение</Link>
          {/* Добавляем ссылку на Flowbyte */}
        </div>
        <div className="container__contacts">
          <p>Контакты</p>
          <p>Email: <a href="mailto:manage@courserio.ru">manage@courserio.ru</a></p>
        </div>
        <div className="container__social-links">
          <p>Мы в социальных сетях</p>
          <a href="https://vk.com/courserio" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faVk} className="social-icon" />
          </a>
          <a href="https://t.me/courserio" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegramPlane} className="social-icon" />
          </a>
        </div>
        <p>Разработано веб студией <Link href="https://flowbyte.ru" className="nav-link" target="_blank" rel="noopener noreferrer">Flowbyte</Link></p>

      </div>
    </footer>
  );
}

export default Footer;
