import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";



import { div, div } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";

import MyCourses from "../MyCourses";
import SideBar from "./SideBar";

function UserDashmain() {
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <div>
                    <aside className="col-md-3">
                        <SideBar />
                    </aside>
                    <section className="col-md-8">
                        <Outlet />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default UserDashmain;
