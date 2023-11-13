import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import TabsAuth from "../TabComponent/Tabs";
import "./modal.css"

function ModalRegisterLogin() {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [authState, setAuthState] = useState("");
    function handleShow(breakpoint,auth) {
        setFullscreen(breakpoint);
        setShow(true);
        setAuthState(auth)
    }


    return (
        <>

            <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
                
            >
                <div className="ModalFull">
                <Modal.Header closeButton>
                    <Modal.Title>intellity code</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ display: "block" }}>
                        <TabsAuth authState = {authState}/>
                    </div>
                </Modal.Body>
                
                </div>

            </Modal>
            <Nav.Link
                className="text-primary fw-bold"
                onClick={() => handleShow(true,"register")}
            >
                Регистрация
            </Nav.Link>
            <Button variant="info" onClick={() => handleShow(true,"login")}>
                Войти
            </Button>
        </>
    );
}

export default ModalRegisterLogin;
