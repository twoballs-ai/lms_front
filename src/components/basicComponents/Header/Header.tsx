"use client"; // This directive must be at the top
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import "./Header.scss"; // Import SCSS file
import TabsAuth from "../Auth/TabsLoginRegister/TabComponent/Tabs";
import LmsModalBase from "../../reUseComponents/ModalBase";
import { MenuOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";

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
  function handleShow(auth) {
    handleOpenModal();
    setAuthState(auth);
  }

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const contentToModal = (<TabsAuth authState={authState} handleCloseModal={handleCloseModal} />);

  const [role, setRole] = useState<string | null>(null);



  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage items
    setIsAuth(false);
    router.push('/'); // Redirect to home page
  };

  return (
    <div className="container__header-container">
      <div className="header-container__logo-and-menu">
        <Link href="/" className="logo-an-menu__logo">
          Courserio
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <MenuOutlined />
        </button>
      </div>

      <div className={`header-container__navbar ${menuOpen ? 'open' : ''}`}>
        <div className="navbar__buttons">
          <Link href="/category" className="nav-link">Курсы</Link>
          <Link href="/news-blog" className="nav-link">Новости</Link>   
          <Link href="/about" className="nav-link">О нас</Link>
          {isAuth ? (
            <div className="nav-dropdown">
              <div className="nav-dropdown-toggle">Профиль</div>
              <div className="nav-dropdown-menu">
                {role === "teacher_model" && (
                  <Link href="/teacher-profile" className="nav-dropdown-item">Личный кабинет учителя</Link>
                )}
                {role === "student_model" && (
                  <Link href="/student-profile" className="nav-dropdown-item">Личный кабинет ученика</Link>
                )}
                <Link href="/" className="nav-dropdown-item" onClick={(e) => {
  e.preventDefault(); // Prevent the default link behavior
  handleLogout(); // Call the logout function
}}>
  Выход
</Link>
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
              <button className="nav-link__login-btn" onClick={() => handleShow("login")}>Войти</button>
              <button className="nav-link__register-btn" onClick={() => handleShow("register")}>Зарегистрироваться</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
