import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import AccountDataService from "../../services/account";

import { useTranslation } from "react-i18next"
import i18next from "i18next";
import cookies from "js-cookie";


function TopWidget() {
    const [user, setUser] = useState(null);
    const { t } = useTranslation()
    const currentLanguageCode = cookies.get("i18next") || "kr"


    useEffect(() => {
        getProfile()
    }, [])

    function changeLanguage() {
        if (currentLanguageCode === "en") {
            i18next.changeLanguage("kr")
        }
        else {
            i18next.changeLanguage("en")
        }
        window.location.reload();
    }


    async function getProfile() {
        try {
            await AccountDataService.getNameFromToken(localStorage.getItem("token"))
                .then(response => {
                    handleSetUser(response.data.name)
                })
        } catch (err) {
            handleWidgetError(err)
        }
    }

    async function handleSetUser(name) {
        console.log(name)
        if (name !== "") {
            setUser(name)
        }
    }

    function logout() {
        try {
            handleLogout()
        } catch (err) {
            handleWidgetError(err)
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem("shoppingCart");
        setUser(null);
    }

    function handleWidgetError(error) {
        console.error(error.message)
    }

    return (

        <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top" expand="md">
            <Container>
                <Navbar.Brand href="/">
                    {t("name")}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/customerservice">
                        {t("customer_service")}
                    </Nav.Link>
                    {/* <Nav.Link href="/newcompany">
                        업체신가요? 지금 업체를 가입하세요!
                    </Nav.Link> */}
                    <Nav.Link onClick={() => {changeLanguage()}}>
                        {t("change_language")}
                    </Nav.Link>
                </Nav>
                
                <Nav className="ms-auto">
                    {user ? (
                    <>
                        <Nav.Link href="/">
                            {t("current_user")}: {user} &nbsp;
                            {/* <Button onClick={() => logout()} className="btn btn-success" href="/">{t("log_out")}</Button> */}
                        </Nav.Link>
                        <Nav.Link href="/" onClick={() => logout()}>
                            {t("log_out")}
                        </Nav.Link>
                    </>
                    ) : (
                    <>
                        <Nav.Link href="/createaccount">
                            {t("register")}
                        </Nav.Link>
                        <Nav.Link href="/login">
                            {t("login")}
                        </Nav.Link>
                    </>
                    )}
                    
                </Nav> 
                </Navbar.Collapse>   
            </Container>
        </Navbar>

    );
};

export default TopWidget;