import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
import AccountDataService from "../../services/account";
import DeliveryServiceDataService from "../../services/deliveryService";

import { useTranslation } from "react-i18next"
import i18next from "i18next";
import cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import storedRedux from "../../redux/store/store";
import { getShoppingCartListFromServerAndSetDynamicShoppingCart } from "../HomePage Widgets/master/ShoppingCart";
import "./NavbarColor.css"

import Modal from "react-bootstrap/Modal"
import deliveryService from "../../services/deliveryService";


function TopWidget() {
    const [user, setUser] = useState(null);
    const { t } = useTranslation()
    const currentLanguageCode = cookies.get("i18next") || "kr"
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryServices, setDeliveryServices] = useState([])
    const dispatch = useDispatch()
    const cartList = useSelector(state=>state.cartList)

    const [deliveryModalOpen, setDeliveryModalOpen] = useState(false)

    function shoppingCartChange() {
        const newShoppingCart = storedRedux.getState().cartList
        const currentTotalCost = getTotalCost(newShoppingCart)
        setTotalPrice(currentTotalCost)
        // dispatch(adjustDynamicShoppingCart(newShoppingCart))
    }

    storedRedux.subscribe(shoppingCartChange)

    useEffect(() => {
        dispatch(getShoppingCartListFromServerAndSetDynamicShoppingCart())
        getProfile()
        const currentTotalCost = getTotalCost(cartList)
        setTotalPrice(currentTotalCost)
        retrieveDeliveryServicesAndRatings()
    }, [])

    async function retrieveDeliveryServicesAndRatings() {
        DeliveryServiceDataService.getAllDeliveryServiceRatings()
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

    function handleGetError(error) {
        console.error(error)
    }

    function getDeliveryServicesBody() {
        const returnDeliveryServicesList = []
        for (let index = 0; index < deliveryServices.length; ++index) {
            returnDeliveryServicesList.push(
                <div key={deliveryServices[index][0]}>
                    {`${deliveryServices[index][0]}${t("minimum_purchase")}: $${deliveryServices[index][3]}`}
                </div>
            )
        }
        return returnDeliveryServicesList.map((service) => {
            return (
                service
            )
        })
    }

    function changeLanguage() {
        if (currentLanguageCode === "en") {
            i18next.changeLanguage("ko")
        }
        else {
            i18next.changeLanguage("en")
        }
        window.location.reload();
    }


    async function getProfile() {
        try {
            await AccountDataService.getNameFromToken()
                .then(response => {
                    handleSetUser(response.data.name)
                })
        } catch (err) {
            handleWidgetError(err)
        }
    }

    async function handleSetUser(name) {
        if (name !== "") {
            setUser(name)
        }
    }

    function logout() {
        try {
            handleLogout()
        } catch (err) {
            handleWidgetError(err)
        }
    }

    function handleLogout() {
        sessionStorage.removeItem("shoppingCart");
        AccountDataService.deleteToken()
        setUser(null);
        window.location.replace("http://hanbanfoods.com/")
    }

    function handleWidgetError(error) {
        console.error(error.message)
    }

    function getTotalCost(shoppingCartList) {
        var totalPrice = 0;
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            totalPrice += shoppingCartList[foodIndex].price;
        }
        return totalPrice.toFixed(2)
    }

    function handleClose() {
        setDeliveryModalOpen(false)
    }

    function showPopup() {
        sessionStorage.removeItem("false")
        window.location.reload()
    }

    return (
        <>
        <Navbar collapseOnSelect style={{backgroundColor: "#ecfdff"}} variant="light" expand="md">
            <Container>
                <Navbar.Brand href="/">
                {/* <img
                    src="/logo512.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                &nbsp; */}
                    {t("brand")}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                {/* <Nav className="me-auto">
                    
                    <Nav.Link href="/newcompany">
                        업체신가요? 지금 업체를 가입하세요!
                    </Nav.Link>
                    <Nav.Link onClick={() => showPopup()}>
                        <i class="bi bi-clipboard-check"></i>
                        {t("announcements")}
                    </Nav.Link>
                    
                </Nav> */}
                
                

                <Nav className="ms-auto">
                    {user ? (
                        <>
                            <Nav.Link href="/">
                                {t("current_user")}: {user} &nbsp;
                                {/* <Button onClick={() => logout()} className="btn btn-success" href="/">{t("log_out")}</Button> */}
                            </Nav.Link>
                            <Nav.Link href="/" onClick={() => logout()}>
                                {t("log_out")}
                            </Nav.Link>
                            
                        </>
                        ) : (
                        <>
                            <Nav.Link href="/createaccount">
                                {t("register")}
                            </Nav.Link>
                            <Nav.Link href="/login">
                                {t("login")}
                            </Nav.Link>
                        </>
                    )}
                </Nav>
                </Navbar.Collapse>   
            </Container>
        </Navbar>
        <Navbar className="navbar-second py-0" variant="light">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/customerservice">
                        <i className="bi bi-info-circle"></i>
                        <div className="div-inline"><div className="d-none d-lg-block">{t("customer_service")}</div></div>
                    </Nav.Link>
                    <Nav.Link disabled>
                        <i className="bi bi-person-add"></i>
                        <div className="div-inline"><div className="d-none d-lg-block">{t("membership_alert")}</div></div>
                    </Nav.Link>
                    <Nav.Link onClick={() => setDeliveryModalOpen(true)}>
                        <i className="bi bi-shop-window"></i>
                        <div className="div-inline"><div className="d-none d-lg-block">{t("see_delivery_minimum_fees")}</div></div>
                    </Nav.Link>
                    <Nav.Link onClick={() => {changeLanguage()}}>
                        <i className="bi bi-globe2"></i>
                        <div className="div-inline"><div className="d-none d-lg-block">{t("change_language")}</div></div>
                    </Nav.Link>
                    {/* <Nav.Link onClick={() => showPopup()}>
                        <i class="bi bi-clipboard-check"></i>
                        {t("announcements")}
                    </Nav.Link> */}

                </Nav>

                <Nav className="ms-auto">
                    <Nav.Link href="/shoppingcart">
                        <i className="bi bi-cart4"></i>
                        <div className="div-inline"><div className="d-none d-md-block">{t("shopping_cart")}</div></div>
                        &nbsp; ({t("total_price")}: ${totalPrice})
                    </Nav.Link>
                    
                    {/* <Nav.Link href="/purchase">
                        {t("purchase")} ({t("total_price")}: ${totalPrice})
                    </Nav.Link> */}
                    
                    
                </Nav> 
                
            </Container>
        </Navbar>

        <Modal show={deliveryModalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                {t("minimum_purchase_for_each_delivery_service")}:
            </Modal.Header>
            <Modal.Body>
                {getDeliveryServicesBody()}
            </Modal.Body>
        </Modal>
        </>

        
    );
};

export default TopWidget;