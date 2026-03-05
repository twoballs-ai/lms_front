"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./Header.scss";
import TabsAuth from "../Auth/TabsLoginRegister/TabComponent/Tabs";
import LmsModalBase from "../../reUseComponents/ModalBase";
import LmsDrawerBase from "../../reUseComponents/Drawer";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";
type UserRole = "teacher_model" | "student_model" | null;

function Header() {
  const [authState, setAuthState] = useState<AuthMode>("login");
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleShow = (auth: AuthMode) => {
    setOpenModal(true);
    setAuthState(auth);
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    const token = localStorage.getItem("access_token");
    const storedRole = localStorage.getItem("role");

    setIsAuth(Boolean(token));
    if (storedRole) {
      setRole(JSON.parse(storedRole) as UserRole);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    setRole(null);
    router.push("/");
  };

  const contentToModal = useMemo(
    () => <TabsAuth authState={authState} handleCloseModal={handleCloseModal} />,
    [authState],
  );

  return (
    <header className="container__header-container">
      <div className="header-container__logo-and-menu">
        <Link href="/" className="logo-an-menu__logo">
          <Image
            src="/logo.png"
            alt="Courserio Logo"
            width={230}
            height={70}
            priority
          />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Открыть меню">
          <MenuOutlined />
        </button>
      </div>

      <nav className={`header-container__navbar ${menuOpen ? "open" : ""}`}>
        <div className="navbar__buttons">
          <Link href="/category" className="nav-link">
            Курсы
          </Link>
          <Link href="/news-blog" className="nav-link">
            Новости
          </Link>
          <Link href="/about" className="nav-link">
            О нас
          </Link>
          {isAuth ? (
            <div className="nav-dropdown">
              <div className="nav-dropdown-toggle">Профиль</div>
              <div className="nav-dropdown-menu">
                {role === "teacher_model" && (
                  <Link href="/teacher-profile/dashboard" className="nav-dropdown-item">
                    Личный кабинет учителя
                  </Link>
                )}
                {role === "student_model" && (
                  <Link href="/student-profile/dashboard" className="nav-dropdown-item">
                    Личный кабинет ученика
                  </Link>
                )}
                <Link
                  href="/"
                  className="nav-dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Выход
                </Link>
              </div>
            </div>
          ) : (
            <>
              {isMobile ? (
                <LmsDrawerBase open={openModal} onClose={handleCloseModal} content={contentToModal} />
              ) : (
                <LmsModalBase open={openModal} onClose={handleCloseModal} content={contentToModal} showCloseIcon />
              )}
              <button className="nav-link__login-btn" onClick={() => handleShow("login")}>
                Войти
              </button>
              <button className="nav-link__register-btn" onClick={() => handleShow("register")}>
                Регистрация
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
