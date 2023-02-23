import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    AddressElement,
    LinkAuthenticationElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next"
import PurchaseDataService from "../../services/purchase";
import { deleteAllFromUser } from "../HomePage Widgets/master/ShoppingCart";
import { useDispatch } from "react-redux";
import AccountDataService from "../../services/account";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";

const CARD_OPTIONS = {
    iconStyle: "solid",
}

export default function CheckoutForm(params) {
    const { t } = useTranslation()
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const [opened, setOpened] = useState(false)
    const [validated, setValidated] = useState(false);

    const initialNewUserState = {
        phonenumber: "",
        kakaoid: "",
        name: "",
        address: {
            city: "",
            line1: "",
            line2: null,
            postal_code: "",
            state: "",
            country: ""
        }
    };

    const [newUser, setNewUser] = useState(initialNewUserState);

    function handleInputChange(input) {
        const { name, value } = input.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function checkIfTokenExists() {
            let token
            await AccountDataService.getToken()
                .then(async response => {
                    token = response.data
                })
            if (token !== "false") {
                document.getElementsByClassName("prefilled form-check")[0].firstChild.checked = true;
                await AccountDataService.getInfo()
                    .then(async response => {
                        document.getElementsByClassName("form-control")[0].defaultValue = response.data.name
                        document.getElementsByClassName("form-control")[1].defaultValue = parseInt(response.data.phone_number)
                        if (response.data.kakao_id) {
                            document.getElementsByClassName("form-control")[2].defaultValue = response.data.kakao_id
                        }
                    })
            }
        }
        checkIfTokenExists()
    }, [])   

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    console.log(initialNewUserState.phonenumber)
                    // 
                    PurchaseDataService.transferMoney(
                        {phoneNumber: initialNewUserState.phonenumber, 
                            dynamicShoppingCart: params.dynamicShoppingCart})
                    dispatch(deleteAllFromUser())
                    break;
                case "processing":
                    setMessage("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        })
    }, [stripe])

    async function handleSubmit(e) {
        e.preventDefault()

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true);
        
        const { error } = await stripe.confirmPayment({
            elements, 
            confirmParams: {
                return_url: "http://localhost:3000",
                // receipt_email: email,
            }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }

    const style = {
        base: {
            fontFamily: "DoHyeon"
        }
    }

    async function prefillInfo(e) {
        console.log(e.target.checked)
        if (e.target.checked === false) {
            document.getElementsByClassName("form-control")[0].defaultValue = ""
            document.getElementsByClassName("form-control")[1].defaultValue = ""
            document.getElementsByClassName("form-control")[2].defaultValue = ""
        } else {
            let token
            await AccountDataService.getToken()
                .then(async response => {
                    token = response.data
                })
            if (token === "false") {
                setOpened(true)
                document.getElementsByClassName("prefilled form-check")[0].firstChild.checked = false
            } else {
                await AccountDataService.getInfo()
                    .then(async response => {
                        document.getElementsByClassName("form-control")[0].defaultValue = response.data.name
                        document.getElementsByClassName("form-control")[1].defaultValue = parseInt(response.data.phone_number)
                        if (response.data.kakao_id) {
                            document.getElementsByClassName("form-control")[2].defaultValue = response.data.kakao_id
                        }
                    })
            }
            
            
        }
    }

    

    return (
        <Form id="payment-form" noValidate validated={validated} onSubmit={handleSubmit}>
            {/* <LinkAuthenticationElement 
                id="link-authentication-element"
                onChange={(e) => setEmail(e.target.value)}
            /> */}
            <Form.Check 
                className="prefilled"
                label="자동 채워넣기 (회원용)"
                type="checkbox"
                onClick={prefillInfo}
            />

            <Form.Group>
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
            <Form.Group>
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
                
            
            </Form.Group>
            <Form.Group>
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
            <br />
            <h2>{t("card_information")}</h2>
            <Form.Group>
            <AddressElement 
                options={{mode: 'shipping'}} 
                style={style} 
                onChange={(event) => {
                    if (event.complete) {
                        setNewUser({...newUser, ["address"]: event.value.address})
                        console.log(newUser)
                    }
                }}
            />
            <PaymentElement style={style} />
                
            </Form.Group>
            <Button type="submit" disabled={isLoading || !stripe || !elements} onClick={handleSubmit}>
                {isLoading ?
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> :
                    <>{t("pay_now")}</>
                }
            </Button>
                {/* Show any error or success messages */}
            {/* {message && <div id="payment-message">{message}</div>} */}
            <Modal show={opened} onHide={() => setOpened(false)}>
                <Modal.Header closeButton>
                    {t("login_required")}
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">{t("go_to_login")}</Link>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}