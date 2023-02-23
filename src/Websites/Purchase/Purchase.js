import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Stripe from "./Stripe";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


import { Navigate } from "react-router-dom";

import deliveryServiceDataService from "../../services/deliveryService";

import { useSelector, useDispatch } from "react-redux"
import { getShoppingCartListFromServerAndSetDynamicShoppingCart } from "../HomePage Widgets/master/ShoppingCart";
import storedRedux from "../../redux/store/store";
import { Link } from "react-router-dom";

function Purchase() {
    const { t } = useTranslation()
    const dynamicShoppingCart = useSelector(state=>state.dynamicCart)
    const dispatch = useDispatch()

    

    function dynamicCartChange() {
        const currentDynamicShoppingCart = storedRedux.getState().dynamicCart
        validateDeliveryMinimum()
        setPresentedDynamicShoppingCart(currentDynamicShoppingCart)
        const currentTotalCost = getTotalCost(currentDynamicShoppingCart)
        setTotalPrice(currentTotalCost)
        const currentAddedCost = getAddedCost(currentDynamicShoppingCart)
        setAddedPrice(currentAddedCost)
        const currentFinalCost = getFinalCost(currentTotalCost, currentAddedCost)
        setFinalPrice(currentFinalCost)
    }

    storedRedux.subscribe(dynamicCartChange)

    const [deliveryServices, setDeliveryServices] = useState(["전체 업체"]);
    const [closed, setClosed] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    const [finalPrice, setFinalPrice] = useState(0)
    const [addedPrice, setAddedPrice] = useState(0)

    const [validated, setValidated] = useState(false);
    const [presentedDynamicShoppingCart, setPresentedDynamicShoppingCart] = useState({})

    useEffect(() => {
        dispatch(getShoppingCartListFromServerAndSetDynamicShoppingCart())
        retrieveDeliveryServicesAndRatings()
    }, [])

    function eachDeliveryTotal(dynamicShoppingCart) {
        const eachDeliveryTotalDictionary = getNoEachDeliveryTotalDictionary(dynamicShoppingCart)
        return getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary)
    }

    function getEachList(dynamicShoppingCart) {
        return getList(dynamicShoppingCart)
    }

    function getList(dynamicShoppingCart) {
        const eachDeliveryTotalList = [];
        for (var foodId in dynamicShoppingCart) {
            eachDeliveryTotalList.push(
                <ListGroup.Item>
                    <div class="d-flex justify-content-between">
                        <div>
                            {dynamicShoppingCart[foodId].Food.food_name} ({dynamicShoppingCart[foodId].Food.delivered_by})
                        </div>
                        <div>
                            {dynamicShoppingCart[foodId].Food.price} ({dynamicShoppingCart[foodId].Amount})
                        </div>
                    </div>
                </ListGroup.Item>
            )
        }
        return eachDeliveryTotalList.map((listGroup) => {
            return (
                listGroup
            )
        })
    }

    async function validateDeliveryMinimum() {
        const eachDeliveryTotalDictionary = await getEachDeliveryTotalDictionary()
        await checkIfDeliveryMinimumMet(eachDeliveryTotalDictionary)
    }

    function getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary) {
        if (Object.keys(eachDeliveryTotalDictionary).length === 0) {
            return (
                <div>{t("no_food_in_shopping_cart")}</div>
            )
        }

        const eachDeliveryTotalList = [];
        for (var deliveryService in eachDeliveryTotalDictionary) {
            eachDeliveryTotalList.push(
                <div key={deliveryService}>
                    {`${deliveryService}: $${eachDeliveryTotalDictionary[deliveryService][1] - eachDeliveryTotalDictionary[deliveryService][0]}${t("more_required")}
                    (${t("delivery_minimum")}: $${eachDeliveryTotalDictionary[deliveryService][1]})`}
                </div>
            )
        }

        return eachDeliveryTotalList.map((service) => {
            return (
                service
            )
        })
    }

    async function checkIfDeliveryMinimumMet(eachDeliveryTotalDictionary) {
        if (Object.keys(eachDeliveryTotalDictionary).length === 0) {
            setValidated(false)
        } else {
            let listValidated = true;
            for (var deliveryService in eachDeliveryTotalDictionary) {
                if (eachDeliveryTotalDictionary[deliveryService][0] < eachDeliveryTotalDictionary[deliveryService][1]) {
                    listValidated = false
                }
            }
            setValidated(listValidated)
        }
    }

    async function retrieveDeliveryServicesAndRatings() {
        deliveryServiceDataService.getAllDeliveryServiceRatings()
            .then(response => {
                handleSetDeliveryServices(response.data)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    function handleSetDeliveryServices(deliveryServices) {
        setDeliveryServices([...(new Set(deliveryServices
                .map(({service_name, rating, rated_users, delivery_minimum})=>
                        [service_name, rating, rated_users, delivery_minimum])))]);
    }

    function handleClose() {
        setClosed(true)
    }

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

    function getNoEachDeliveryTotalDictionary() {
        const eachDeliveryTotalDictionary = {};
        for (var key in dynamicShoppingCart) {
            if (dynamicShoppingCart[key].Food.delivered_by in eachDeliveryTotalDictionary) {
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by][0] 
                += dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount
            } else {
                const minimumPrice = getCorrespondingMinimumPrice(dynamicShoppingCart[key].Food.delivered_by)
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by]
                = [dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount, minimumPrice];
            }
        }
        return eachDeliveryTotalDictionary;
    }

    async function getEachDeliveryTotalDictionary() {
        const eachDeliveryTotalDictionary = {};
        for (var key in dynamicShoppingCart) {
            if (dynamicShoppingCart[key].Food.delivered_by in eachDeliveryTotalDictionary) {
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by][0] 
                += dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount
            } else {
                const minimumPrice = getCorrespondingMinimumPrice(dynamicShoppingCart[key].Food.delivered_by)
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by]
                = [dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount, minimumPrice];
            }
        }
        return eachDeliveryTotalDictionary;
    }

    function getCorrespondingMinimumPrice(inputService) {
        for (let index=0; index < deliveryServices.length; ++index) {
            if (inputService === deliveryServices[index][0]) {
                return deliveryServices[index][3]
            }
        }
    }

    function handleGetError(error) {
        console.error(error)
    }

    function getTotalCost(inputDynamicCart) {
        var totalPrice = 0;
        for (let key in inputDynamicCart) {
            totalPrice += inputDynamicCart[key].Food.price * inputDynamicCart[key].Amount;
        }
        return totalPrice.toFixed(2)
    }

    function getAddedCost(inputDynamicCart) {
        var addedPrice = 0;
        for (let key in inputDynamicCart) {
            addedPrice += inputDynamicCart[key].Amount * 0.99
        
        }
        return addedPrice.toFixed(2)
    }
    
    function getFinalCost(totalPrice, addedPrice) {
        return (Number(totalPrice) + Number(addedPrice)).toFixed(2)
    }
    
    return (
        validated ?
        <div>
            <div className="jumbotron">
                <Container>
                    <h1 className="display-4">{t("insert_payment_information")}</h1>
                </Container>
                
            </div>

            <Container>

            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                <i className="bi bi-chevron-double-left"></i>{t("see_more_foods")}
            </Link>

            <br />
            <br />
            

            <Row>
            <Col sm={6}>

            

            <h2>{t("literal_shopping_cart")}</h2>
            <Card>
                <Card.Header>
                <div class="d-flex justify-content-between">
                    <div>
                        {t("food_name")} ({t("delivery_service")}):
                    </div>
                    <div>
                        {t("price")} ({t("amount_popover")}):
                    </div>
                </div>
                </Card.Header>
                <ListGroup>
                    {getEachList(presentedDynamicShoppingCart)}
                </ListGroup>
            </Card>

            <div class="d-flex justify-content-between">
                <div>
                </div>
                <div>
                    {t("food_price")}: {totalPrice}
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <div>
                </div>
                <div>
                    {t("service_fee")}: {addedPrice}
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <div>
                </div>
                <div>
                    {t("total_price")}: {finalPrice}
                </div>
            </div>

            </Col>

            


            <Col sm={6}>

            <h2>{t("delivery_information")}</h2>

            <Stripe />

            {/* <Form>
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

            <Button type="submit">구매하기</Button> */}
            </Col>
            </Row>
            </Container>
        </div> : 
        closed ? 
        <Navigate to="/shoppingcart" />
        :
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    {t("fee_required")}
                </Modal.Header>
                <Modal.Body>
                   {eachDeliveryTotal(presentedDynamicShoppingCart)} 
                </Modal.Body>
            </Modal>
        </>
    );
}


export default Purchase;