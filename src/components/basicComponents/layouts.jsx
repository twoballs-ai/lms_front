import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import React from "react";
import Container from "react-bootstrap/Container";
function layouts() {
    return (
        <>
            <Container fluid className="p-0 bg-light">
                <Header />
                <Main />
                <Footer />
            </Container>
        </>
    );
}

export default layouts;
