import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
        <div className="footer__container">
            <div className="container__logo">
                2024. intellity code
            </div>
            <div className="container__links">
               Блок ссылок
            </div>
            <div className="container__social-links">
               Блок иконок
            </div>
        </div>
    </footer>
  );
}

export default Footer;