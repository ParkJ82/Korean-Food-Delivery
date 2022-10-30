import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const TopWidget = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    한반 - 초간단 한인 반찬 배달
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>
                    고객센터
                    </Nav.Link>
                    <Nav.Link>
                        점포면 회사 가입하기!
                    </Nav.Link>
                </Nav>
                
                <Nav className="ms-auto">
                    <Nav.Link href="/createaccount">
                        <button type="button" className="btn btn-warning">회원가입</button>
                    </Nav.Link>
                    <Nav.Link href="/login">
                        <button type="button" className="btn btn-warning">로그인</button>
                    </Nav.Link>
                </Nav>
                

                
                
            </Container>
        </Navbar>
        </>
    );
};

export default TopWidget;