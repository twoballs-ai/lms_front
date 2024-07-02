import React from "react";
import { Outlet } from "react-router-dom";
import "./DashMain.scss";

import SideBar from "./SideBar";

function TeacherDashMain() {
    return (
        <div className="container__teacher-dashboard">
            <div className="dashboard-body">
                <aside className="dashboard-body__left-menu">
                    <SideBar />
                </aside>
                <section className="dashboard-body__content">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}

export default TeacherDashMain;
