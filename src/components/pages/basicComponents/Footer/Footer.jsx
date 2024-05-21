import React, { useState, useEffect } from "react";
import "./Footer.scss"
// import axios from "axios";
// import { apiLmsUrl } from "../../../shared/config";
// import SiteService from "../../../services/site.service";
function Footer() {
    //     const [categoryData, setCategoryData] = useState([]);
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             await SiteService.getCategory().then((response) => {
    //                 if (response.status === 200 || response.status === 201) {
    //                     setCategoryData(response.data.data);
    //                 }
    //             });
    //         };
    //         fetchData();
    //     }, []);

    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <div className="container__info-link-row">
                        <div className="info-link-row__about">
                            <h4>Intellity code</h4>
                            <p>Добро пожаловать в систему обучения и преподавания. Желаем достижения успехов.</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Ссылки</h4>
                            <ul className="list-unstyled">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Courses</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h4>Свяжитесь с нами</h4>
                            <address>
                                123 Main Street<br />
                                City, State ZIP<br />
                                <abbr title="Phone">P:</abbr> (123) 456-7890
                            </address>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
