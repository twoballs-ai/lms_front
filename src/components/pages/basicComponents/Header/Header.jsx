import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; // Import SCSS file
// import ModalRegisterLogin from "../../Auth/TabsLoginRegister/HeaderComponents/ModalRegistrationLogin";
import LmsButton from "../../../reUseComponents/Button";
import TabsAuth from "../../Auth/TabsLoginRegister/TabComponent/Tabs";
import LmsModalBase from "../../../reUseComponents/ModalBase";

function Header() {
    const customModalStyles = {
        modal: {
            maxWidth: '100vw',
            width: '100vw',
            height: '100vh',
            padding: '0',
            margin: '0',
            overflow: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    const [authState, setAuthState] = useState("");
    function handleShow(breakpoint, auth) {
        handleOpenModal();
        setAuthState(auth);
    }
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const contentToModal = (<TabsAuth authState={authState} handleCloseModal={handleCloseModal} />);

    const [searchData, setSearchData] = useState({
        search: "",
    });

    const role = JSON.parse(localStorage.getItem('role'));
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
        if (JSON.parse(localStorage.getItem('access_token')) !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <div className="container__header-container">
            <Link to="/" className="header-container__logo">
                Courserio
            </Link>
            <div className="header-container__navbar">
                <div className="navbar__buttons">
                    <Link to="/category" className="nav-link">Курсы</Link>
                    <Link to="/news-blog" className="nav-link">Новости</Link>   
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
                    ) : (
                        <>
                            <LmsModalBase
                                open={openModal}
                                onClose={handleCloseModal}
                                content={contentToModal}
                                modalStyles={customModalStyles}
                                showCloseIcon={false}
                            />
                            <button className="nav-link__login-btn" onClick={() => handleShow(true, "login")}>Войти</button>

                            <button className="nav-link__register-btn" onClick={() => handleShow(true, "register")}>Зарегистрироваться</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
