import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; // Import SCSS file
import ModalRegisterLogin from "../../Auth/TabsLoginRegister/HeaderComponents/ModalRegistrationLogin";
import LmsButton from "../../../reUseComponents/Button";

function Header() {
    const [searchData, setSearchData] = useState({
        search: "",
    });

    const role = localStorage.getItem("role");
    const handleChange = (event) => {
        setSearchData({
            ...searchData,
            [event.target.name]: event.target.value,
        });
    };

    const searchByCourse = () => {
        if (searchData.search !== "")
            window.location.href = "/search/" + searchData.search;
    };

    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <div className="container__header-container">
            <Link to="/" className="header-container__logo">
                Intellity code
            </Link>
            <div className="header-container__navbar">
                <div className="navbar__search">
                    <input
                        type="search"
                        name="search"
                        onChange={handleChange}
                        placeholder="Поиск курсов по названию"
                        className="search__input"
                        aria-label="Search"
                    />
                    <LmsButton buttonText={"Поиск"} handleClick={searchByCourse} />
                    
                </div>
                <div className="nav-links ms-auto">
                    <Link to="/category" className="nav-link">Категории</Link>
                    <Link to="/all-courses" className="nav-link">Курсы</Link>
                    <Link to="/about" className="nav-link">О нас</Link>

                    {isAuth ? (
                        <div className="nav-dropdown">
                            <div className="nav-dropdown-toggle">Профиль</div>
                            <div className="nav-dropdown-menu">
                                {role === "teacher_model" && (
                                    <Link to="/teacher-profile" className="nav-dropdown-item">Личный кабинет учителя</Link>
                                )}
                                {role === "student_model" && (
                                    <Link to="/student-profile" className="nav-dropdown-item">Личный кабинет ученика</Link>
                                )}
                                <Link to="/logout" className="nav-dropdown-item">Выход</Link>
                            </div>
                        </div>
                    ) : <ModalRegisterLogin />}
                </div>
            </div>
        </div>
    );
}

export default Header;