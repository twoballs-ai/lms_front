import Header from "./Header/Header";
import Main from "./Main";
import React from "react";
import "./layout.scss"
import Footer from "./Footer/Footer";
export default function Layout() {
    return (
        <>
            <div className="container">
                <Header/>
                <Main />
                <Footer />
            </div>
        </>
    );
}

