import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LoginContext from "../../login-context";
import account from "../../services/account";
import { toast } from "react-toastify";


function TopWidget() {
    // const inputUser = useContext(LoginContext);
    const [user, setUser] = useState(null);

    function getProfile() {
        try {
            account.getName({jwt_token: localStorage.token})
                .then(response => {
                    if (response.name !== "") {
                        setUser(response.name)
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function logout(e) {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("totalPrice");
            localStorage.removeIten("shoppingCart")
            setUser(null);
            // inputUser.login();
            toast.success("Logout successfully")
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    console.log(user);

    return (
        <>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    한반 - 초간단 한인 반찬 배달
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/customerservice">
                    고객센터
                    </Nav.Link>
                    <Nav.Link href="/newcompany">
                        업체신가요? 지금 업체를 가입하세요!
                    </Nav.Link>
                    {/* <Nav.Link href="/en">
                        change language to english
                    </Nav.Link> */}
                </Nav>
                
                <Nav className="ms-auto">
                    {user ? (
                    <>
                        <Nav.Link href="/">
                            현재 회원: {user} &nbsp; 
                            <Button onclick={(e) => logout(e)} className="btn btn-success">로그아웃</Button>
                        </Nav.Link>
                    </>
                    ) : (
                    <>
                        <Nav.Link href="/createaccount">
                            <Button className="btn btn-success">회원가입</Button>
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <Button className="btn btn-success">로그인</Button>
                        </Nav.Link>
                    </>
                    )}
                    
                </Nav>    
            </Container>
        </Navbar>
        </>
    );
};

export default TopWidget;