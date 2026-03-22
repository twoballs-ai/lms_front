"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./Header.scss";
import TabsAuth from "../Auth/TabsLoginRegister/TabComponent/Tabs";
import LmsModalBase from "../../reUseComponents/ModalBase";
import LmsDrawerBase from "../../reUseComponents/Drawer";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
type AuthMode = "login" | "register";
type UserRole = ("teacher" | "student" | "site_user")[];

function Header() {
  const [authState, setAuthState] = useState<AuthMode>("login");
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [roles, setRoles] = useState<UserRole>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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

    const syncAuthState = () => {
      const token = localStorage.getItem("access_token");
      const storedRoles = localStorage.getItem("roles");

      setIsAuth(Boolean(token));

      if (!storedRoles) {
        setRoles([]);
        return;
      }

      try {
        setRoles(JSON.parse(storedRoles));
      } catch {
        setRoles([]);
      }
    };

    syncAuthState();
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth:changed", syncAuthState);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth:changed", syncAuthState);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth:changed"));
    setIsAuth(false);
    setRoles([]);
    router.push("/");
  };

  const contentToModal = useMemo(
    () => (
      <TabsAuth authState={authState} handleCloseModal={handleCloseModal} />
    ),
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
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <MenuOutlined />
        </button>
      </div>

      <nav className={`header-container__navbar ${menuOpen ? "open" : ""}`}>
        <div className="navbar__buttons">
          <Link href="/category" className="nav-link">
            Курсы
          </Link>
          <Link href="/traineers" className="nav-link">
            Тренажеры
          </Link>
          <Link href="/news-blog" className="nav-link">
            Новости
          </Link>
          <Link href="/about" className="nav-link">
            О нас
          </Link>
          {isAuth ? (
            <div
              className="nav-dropdown"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <div className="nav-dropdown-toggle">Профиль</div>

              {profileOpen && (
                <div className={`nav-dropdown-menu ${profileOpen ? "open" : ""}`}>
                  {roles.includes("teacher") && (
                    <Link
                      href="/teacher-profile/dashboard"
                      className="nav-dropdown-item"
                    >
                      Личный кабинет учителя
                    </Link>
                  )}

                  {roles.includes("student") && (
                    <Link
                      href="/student-profile/dashboard"
                      className="nav-dropdown-item"
                    >
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
              )}
            </div>
          ) : (
            <>
              {isMobile ? (
                <LmsDrawerBase
                  open={openModal}
                  onClose={handleCloseModal}
                  content={contentToModal}
                />
              ) : (
                <LmsModalBase
                  open={openModal}
                  onClose={handleCloseModal}
                  content={contentToModal}
                  showCloseIcon
                />
              )}
              <button
                className="nav-link__login-btn"
                onClick={() => handleShow("login")}
              >
                Войти
              </button>
              <button
                className="nav-link__register-btn"
                onClick={() => handleShow("register")}
              >
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
