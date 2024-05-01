import React, { useState, useEffect } from "react";

import TabsAuth from "../TabComponent/Tabs";
// import "./ModalRegistrationLogin.scss"
import LmsButton from "../../../../reUseComponents/Button";
import LmsModalBase from "../../../../reUseComponents/ModalBase";

function ModalRegisterLogin() {
    const customModalStyles = {
        modal: {
            maxWidth: '100vw',
            width: '100vw',
            height: '100vh',
            padding: '0',
            margin: '0',
            overflow: 'none'


        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)'
        }
    };

    const [authState, setAuthState] = useState("");
    function handleShow(breakpoint, auth) {
        // setFullscreen(breakpoint);
        handleOpenModal()
        setAuthState(auth)
    }
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const contentToModal = (<TabsAuth authState={authState} />)

    return (
        <>
            <LmsModalBase
                open={openModal}
                onClose={handleCloseModal}
                content={contentToModal}
                modalStyles={customModalStyles}
            />
            <LmsButton buttonText={"Регистрация"} handleClick={() => handleShow(true, "register")} />
            <LmsButton buttonText={"Войти"} handleClick={() => handleShow(true, "login")} />

        </>
    );
}

export default ModalRegisterLogin;
