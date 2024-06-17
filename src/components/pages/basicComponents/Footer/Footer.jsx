import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVk, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="footer__container">
        <div className="container__logo">
          2024. intellity code, LMS - современная система обучения.
        </div>
        <div className="container__links">
          Блок ссылок
        </div>
        <div className="container__social-links">
          <a href="https://vk.com/intellity" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faVk} className="social-icon" />
          </a>
          <a href="https://t.me/intellity" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegramPlane} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;