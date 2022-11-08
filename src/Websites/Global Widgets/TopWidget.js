import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LoginContext from "../../login-context";


function TopWidget() {
    const currentUser = useContext(LoginContext);

    console.log(currentUser);

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
                    {currentUser.user ? (
                    <>
                        <Nav.Link href="/">
                            현재 회원: {currentUser.user.name} &nbsp; 
                            <Button className="btn btn-success">로그아웃</Button>
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