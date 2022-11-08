import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AccountDataService from "../../services/account";
import LoginContext from "../../login-context";


const LoginWidget = () => {
    const inputUser = useContext(LoginContext);

    const [validated, setValidated] = useState(false);

    const initialUserState = {
        id: "",
        password: ""
    };

    const [user, setUser] = useState(initialUserState);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    function login() {
        AccountDataService.validateAccount(user)
        inputUser.login(user);
    }

    return (
        <div>


            <h1>로그인</h1>


            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3">
                        <Form.Label>아이디: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(아이디 입력하세요)"
                                value={user.id}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                아이디를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3">
                        <Form.Label>비밀번호: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="password"
                                placeholder="(비밀번호를 입력하세요)"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit" onClick={login} href="/">로그인</Button> 계정이 없으신가요? 그렇다면 <strong><a href="/createaccount">회원가입하기</a></strong>
            </Form>
            
        </div>
        
    )
    
}

export default LoginWidget;