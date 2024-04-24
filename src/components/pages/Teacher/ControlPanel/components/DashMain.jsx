import React from "react";
import { Link, Outlet } from "react-router-dom";

import MyCourses from "../MyTeacherCourses";
import SideBar from "./SideBar";

function TeacherDashMain() {
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <Row>
                    <aside className="col-md-3">
                        <SideBar />
                    </aside>

                    <section className="col-md-8">
                        <Outlet />
                    </section>
                </Row>
            </div>
        </div>
    );
}

export default TeacherDashMain;
