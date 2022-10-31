import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";


const TopWidget = () => {
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
                    <Nav.Link>
                        점포면 회사 가입하기!
                    </Nav.Link>
                </Nav>
                
                <Nav className="ms-auto">
                    <Nav.Link href="/createaccount">
                        <Button className="btn btn-success">회원가입</Button>
                    </Nav.Link>
                    <Nav.Link href="/login">
                        <Button className="btn btn-success">로그인</Button>
                    </Nav.Link>
                </Nav>
                

                
                
            </Container>
        </Navbar>
        </>
    );
};

export default TopWidget;