import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";


export default function NewCompany() {
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

            <h1>업체 추가시키기</h1>
            <Button href="/">홈페이지로 돌아가기</Button>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Form.Group as={Col} md="4">
                        <Form.Label>업체명: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(업체명을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                업체명을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>작성자 이름: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(작성자 이름을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                작성자 이름을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                </Row>

                <Row className="mb-3">
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

                    <Form.Group as={Col} md="4">
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
                

                
                <Button type="submit">등록 신청하기</Button> 
                
                (등록 신청하기를 누르면 몇시간 이내에 전화번호로 인증전화가 갑니다)
            </Form>
        </div>
    )
}