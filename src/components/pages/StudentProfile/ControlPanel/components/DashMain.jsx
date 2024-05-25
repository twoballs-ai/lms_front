import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./DashMain.scss"

import SideBar from "./SideBar";

function UserDashmain() {
    return (
        <div className="container__dashboard">
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

export default UserDashmain;
