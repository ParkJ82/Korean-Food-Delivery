import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AccountDataService from "../../services/account";
import { useTranslation } from "react-i18next"
import Container from "react-bootstrap/Container"
import { ToastContainer, toast } from "react-toastify";



function CreateAccountWebsite() {

    const { t } = useTranslation()

    const initialNewUserState = {
        name: "",
        id: "",
        password: "",
        phonenumber: "",
        kakaoid: ""
    };
    const [validated, setValidated] = useState(false);
    const [newUser, setNewUser] = useState(initialNewUserState);


    function handleInputChange(input) {
        const { name, value } = input.target;
        setNewUser({ ...newUser, [name]: value });
    };

    function handleSubmit(input) {
        try {
            if (checkAndHandleValidity(input)) {
                createNewAccountAndGetToken()
            }
        } catch (err) {
            handleSubmitError(err)
        }
    }

    function checkAndHandleValidity(input) {
        const form = input.currentTarget;
        
        
        input.preventDefault();
        input.stopPropagation();
        setValidated(true)
        if (form.checkValidity() === false) {
            return false
        }
        return true
    }

    function createNewAccountAndGetToken() {
        AccountDataService.createNewAccountAndGetToken(newUser)
            .then(async (response) => {
                if (response.data.token) {
                    // await setToken(response.data.token)
                    window.location.reload();
                }
            })
            .catch((error) => {
                    console.log(error)
                    handleNewAccountError(error)
            })
    }

    function handleNewAccountError(inputMessage) {
        console.log(inputMessage.response.data)
        toast(inputMessage.response.data)
    }


    function handleSubmitError(error) {
        console.error(error.message)
    }

    return (
        <Container>
            <br />
            <br />
            <Col md={{ span: 8, offset: 3 }}>
            <h1>{t("create_account")}</h1>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>{t("user_name")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder={`(${t("insert_name")})`}
                                name = "name"
                                value = {newUser.name}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_name")}
                            </Form.Control.Feedback>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>{t("user_id")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder={`(${t("insert_id")})`}
                                name = "id"
                                value = {newUser.id}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_id")}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8">
                        <Form.Label>{t("password")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="password"
                                placeholder={`(${t("insert_password")})`}
                                name = "password"
                                value = {newUser.password}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_password")}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>{t("phone_number")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                name = "phonenumber"
                                value = {newUser.phonenumber}
                                placeholder={`(${t("insert_phone_number")})`}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_phone_number")}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <br />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>{t("kakao_id")} ({t("optional")}): </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={`(${t("insert_kakao_id")})`}
                                name = "kakaoid"
                                value = {newUser.kakaoid}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button size="lg" type="submit" className="border-0" style={{backgroundColor: "#ecfdff", color: "gray"}}>{t("create_account")}</Button>  {t("account_existing")} <strong><a href="/login">{t("go_login")}</a></strong>
            </Form>
        </Col>
        <ToastContainer />
        </Container>
    );
}

export default CreateAccountWebsite;