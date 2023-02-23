import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AccountDataService from "../../services/account";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next";


const LoginWidget = () => {
    // const inputUser = useContext(LoginContext);

    const { t } = useTranslation()

    const [validated, setValidated] = useState(false);

    const initialUserState = {
        id: "",
        password: ""
    };

    const [user, setUser] = useState(initialUserState);

    function handleSubmit(event) {
        try {
            if (handleCheckValidity(event)) {
                login(user)
            }
        } catch (err) {
            handleLoginError(err)
        }
    }

    function handleCheckValidity(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true)
        if (form.checkValidity() === false) {
            return false;
        }
        return true;
    }

    async function login(inputUser) {
        try {
            AccountDataService.loginToAccountAndGetToken(inputUser)
                .then(async (response) => {
                    // await handleLogin(response)
                    window.location.reload();
                })
        } catch (err) {
            handleLoginError(err)
        }
    }

    // async function handleLogin(response) {
    //     if (response.data.token) {
    //         await storeTokenInLocalStorage(response.data.token)
            
    //     } else {
    //         gettoastError(response)
    //     }
    // }

    // async function storeTokenInLocalStorage(token) {
    //     localStorage.setItem("token", token);
    //     toast.success("Logged in Successfully");
    // }

    // function gettoastError(response) {
    //     toast.error(response);
    // }

    function handleLoginError(error) {
        console.error(error.message);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <Container>
            <br />
            <br />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>{t("login")}</h1>
                </Col>
            </Row>

            <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
                        <Form.Label>{t("user_id")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                name="id"
                                placeholder={`(${t("insert_id")})`}
                                value={user.id}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_id")}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
                        <Form.Label>{t("password")}: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                name="password"
                                type="password"
                                placeholder={`(${t("insert_password")})`}
                                value={user.password}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("insert_password")}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Button type="submit">{t("login")}</Button> {t("account_not_existing")} &nbsp;
                    <strong><a href="/createaccount">{t("go_register")}</a></strong>
                </Col>
            </Form>
            </Row>
        </Container>
        
    )
    
}

export default LoginWidget;