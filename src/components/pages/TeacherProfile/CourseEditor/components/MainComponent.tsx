import React from "react";
import { Outlet } from "react-router-dom";
// import "./MainComponent.scss"; // Убедитесь, что у вас есть этот файл стилей

function MainComponent() {
    return (
        <>
            <Outlet />

        </>
    );
}

export default MainComponent;