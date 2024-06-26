import Header from "./Header/Header";
import Body from "./Body/Body";
import React from "react";
import "./layout.scss"
import Footer from "./Footer/Footer";
export default function Layout() {
    return (
        <>
            <div className="container">
                <Header/>
                <Body />
                <Footer />
            </div>
        </>
    );
}

