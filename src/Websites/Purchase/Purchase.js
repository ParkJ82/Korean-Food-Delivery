import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Stripe from "./Stripe";

function Purchase () {
    const [validated, setValidated] = useState(false);
    const [checkedSameAddress, setCheckedSameAddress] = useState(true);
    const [checkedSaveAddress, setCheckedSaveAddress] = useState(true);
    const [checkedSaveCard, setCheckedSaveCard] = useState(true);


    function handleSubmit(event) {
        handleCheckValidity(event)
        setValidated(true);
    }

    function handleCheckValidity(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    }


    return (
        <div>

            <Container>
            <h1>구매 계정 넣기</h1>

            <Row>
            <Col>

            <h2>카드 정보 (모든 정보는 영어로 써주시기 바랍니다)</h2>
            

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>카드 이름 (First Name): </Form.Label>
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
                    <Form.Group as={Col} md="6">
                        <Form.Label>카드 성 (Last Name): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(성을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                성을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>카드 번호: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                placeholder="(카드 번호를 입력하세요)"
                                min="0000000000000000"
                                max="9999999999999999"
                            />
                            <Form.Control.Feedback type="invalid">
                                카드 번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>카드 비밀번호: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                id="password"
                                pattern="[0-9]*"
                                placeholder="(카드 비밀번호를 입력하세요)"
                                maxLength="3"
                            />
                            <Form.Control.Feedback type="invalid">
                                키드 비밀번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>유효기간 (Valid thru): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                placeholder="(유효기간을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                카드 비밀번호를 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                        
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        
                        <Form.Label>주소 1 (Address Line 1): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(주소 1을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                주소 1을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>주소 2 (Address Line 2) (선택): </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="(주소 2를 입력하세요)"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>도시 (City): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(도시를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            도시를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>주 (State): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(주를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            주를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Zipcode: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                placeholder="(Zipcode를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Zipcode를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
            </Col>

            


            <Col>

            <Stripe />

            <Form>
                <h2>배달 주소 정보</h2>
                <Form.Check
                    inline
                    checked={checkedSameAddress}
                    onChange={() => setCheckedSameAddress(!checkedSameAddress)}
                    type="checkbox"
                    id="sameAddress"
                    label="카드 주소와 동일"
                />
            </Form>
            
            
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        
                        <Form.Label>주소 1 (Address Line 1): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(주소 1을 입력하세요)"
                            />
                            <Form.Control.Feedback type="invalid">
                                주소 1을 입력하세요
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>주소 2 (Address Line 2) (선택): </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="(주소 2를 입력하세요)"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>도시 (City): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(도시를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            도시를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>주 (State): </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="(주를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            주를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Zipcode: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                placeholder="(Zipcode를 입력하세요)"
                            />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Zipcode를 입력하세요
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>

            <Form>
                <Form.Check
                    inline
                    checked={checkedSaveCard}
                    onChange={() => setCheckedSaveCard(!checkedSaveCard)}
                    id="saveCard"
                    type="checkbox"
                    label="카드 정보 저장하기"
                />
                <Form.Check
                    inline
                    checked={checkedSaveAddress}
                    onChange={() => setCheckedSaveAddress(!checkedSaveAddress)}
                    id="saveAddress"
                    type="checkbox"
                    label="주소 저장하기"
                />
            </Form>

            <Button type="submit">구매하기</Button>
            </Col>
            </Row>
            </Container>
        </div>
    );
}


export default Purchase;