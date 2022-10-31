import React, { useState } from "react";
import TopWidget from "../Global Widgets/TopWidget";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"



function CreateAccountWebsite() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }


    return (
        <div>
            {<TopWidget />}

            <h1>계정 생성하기</h1>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>이름: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(이름을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                이름을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>아이디: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(아이디를 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                아이디를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8">
                        <Form.Label>비밀번호: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="password"
                                placeholder="(비밀번호를 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>전화번호: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                placeholder="(전화번호를 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                전화번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>카카오톡 아이디 (선택): </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="(카카오톡 아이디를 입력하세요)"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit">계정 생성</Button>  이미 계정이 있으신가요? 그렇다면 <strong><a href="/login">로그인하기</a></strong>
            </Form>
           
        </div>
    );
}



export default CreateAccountWebsite;