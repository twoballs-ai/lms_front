import React from "react";

import { NavLink, Link, Outlet } from "react-router-dom";
function Main() {
    return (
        <>
        <div className="container__main-container">
            <Outlet />
            </div>
        </>
    );
}

export default Main;
