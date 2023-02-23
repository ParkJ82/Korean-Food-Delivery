import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom"
import { useTranslation } from "react-i18next"
import Dropdown from "react-bootstrap/Dropdown"
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container"
import { useSelector, useDispatch } from "react-redux"
import storedRedux from "../../redux/store/store";
import { addToShoppingCart, deleteAllFromShoppingCart, deleteFromShoppingCart, getShoppingCartListFromServerAndSetDynamicShoppingCart } from "../HomePage Widgets/master/ShoppingCart";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export default function ShoppingCart() {
    const { t } = useTranslation()
    const cartList = useSelector(state=>state.cartList)
    const dynamicCart = useSelector(state=>state.dynamicCart)
    const dispatch = useDispatch()

    const [finalPrice, setFinalPrice] = useState(0)
    const [addedPrice, setAddedPrice] = useState(0)

    function handleCloseClick(e) {
        const food = JSON.parse(e.target.id)
        dispatch(deleteAllFromShoppingCart(food))
    }


    async function shoppingCartChange() {
        const newDynamicCart = storedRedux.getState().dynamicCart
        const currentTotalCost = getTotalCost(newDynamicCart)
        setTotalPrice(currentTotalCost)
        // window.location.reload()
        const currentAddedCost = getAddedCost(newDynamicCart)
        setAddedPrice(currentAddedCost)
        const currentFinalCost = getFinalCost(currentTotalCost, currentAddedCost)
        setFinalPrice(currentFinalCost)
    }

    storedRedux.subscribe(shoppingCartChange)

    // const [shoppingCartList, setShoppingCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
    dispatch(getShoppingCartListFromServerAndSetDynamicShoppingCart())
    }, [])


    function getHTMLArray() {
        const outputList = getHTMLArrayFromDynamicShoppingCart()
        return returnIndividualHTML(outputList)
    }

    function handleSubtract(e) {
        const food = JSON.parse(e.target.className)
        dispatch(deleteFromShoppingCart(food, 1))
    } 

    function handleAdd(e) {
        const food = JSON.parse(e.target.className)
        dispatch(addToShoppingCart(food, 1))
    }



    function getHTMLArrayFromDynamicShoppingCart() {
        const amounts = []
        for (let amount = 0; amount <= 10; ++amount) {
            amounts.push(amount)
        }
        const outputList = [];
        var itemNumber = 0;
        for (let key in dynamicCart) {
            itemNumber++;
            outputList.push(<tr>
                <td>{itemNumber}</td>
                <td>{dynamicCart[key].Food.food_name} </td>
                <td>
                <Row>
                    <Col>
                        <Link className={JSON.stringify(dynamicCart[key].Food)} onClick={handleSubtract} style={{textDecoration: 'none', color: "red"}}>-</Link>
                            &nbsp;{dynamicCart[key].Amount}&nbsp;
                        <Link className={JSON.stringify(dynamicCart[key].Food)} onClick={handleAdd} style={{textDecoration: 'none', color: "green"}}>+</Link>
                    </Col>
                    <Col md={{offset: 1}}>
                        <CloseButton
                            id={JSON.stringify(dynamicCart[key].Food)} 
                            onClick={handleCloseClick}
                        />
                    </Col>
                </Row>
                </td>
                <td>{dynamicCart[key].Food.delivered_by}</td>
                <td>{(dynamicCart[key].Food.price * dynamicCart[key].Amount).toFixed(2)}</td>
            </tr>)
        }
        return outputList
    }

    function returnIndividualHTML(inputList) {
        return inputList.map((food) => {
            return (
                food
            )
        })
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
        <div>
            <div className="jumbotron">
                <Container>

                    <h1 className="display-4">{t("shopping_cart")}</h1>
                    <p className="lead">
                        {t("shopping_cart_description")}
                    </p>
                </Container>
            </div>
        <Container>
            
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{t("food_name")}</th>
                        <th>{t("amount_popover")}</th>
                        <th>{t("delivery_service")}</th>
                        <th>{t("price")}</th>
                    </tr>
                </thead>
                <tbody>
                    {getHTMLArray()}
                    
                    <tr>
                        <td colSpan={4} text-align="right">{t("food_price")}:</td>
                        <td>{totalPrice}</td>
                    </tr>
                </tbody>

            </Table>

            
            {/* <Row>
                <div>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                        <i class="bi bi-chevron-double-left"></i>{t("see_more_foods")}
                    </Link>
                </div>
                <div >
                    <Link to="/purchase" className="ml-auto">
                        {t("purchase")} ({t("total_price")}: ${totalPrice})
                    </Link>
                </div>
                    
                    
            </Row> */}

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
            
            <div class="d-flex justify-content-between">
                <div>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                        <i className="bi bi-chevron-double-left"></i>{t("see_more_foods")}
                    </Link>
                </div>
                <div>
                    <Button style={{backgroundColor: "#77cc6d"}} className="border-0 rounded-0" href="/purchase">
                        {t("purchase")}
                    </Button>
                </div>
            </div>
            &nbsp;

        </Container>
        </div>
    )
    
}