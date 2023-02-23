import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Popover from "react-bootstrap/Popover"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
                       
import { useDispatch } from "react-redux";
import { adjustDynamicShoppingCart } from "../../redux/actions"
import { addToShoppingCart } from "../HomePage Widgets/master/ShoppingCart"

                                    
export default function FoodCard(input) {

    // const cartList = useSelector(state=>state.cartList)
    const dispatch = useDispatch()
    // const cartList = useSelector(state=>state.cartList)

    const { t } = useTranslation()
    const [amount, setAmount] = useState(1)
    const [show, setShow] = useState(false)
    const foodAmounts = [1, 2, 3, 4, 5]

    function onChangeAmount(e) {
        const amount = e.target.value;
        setAmount(amount);
    }

    function showDetails() {
        setShow(true)
    }


    function handleAddToShoppingCart(food, amount) {
        dispatch(addToShoppingCart(food, amount))
        dispatch(adjustDynamicShoppingCart(food, amount))
        setShow(false)
    }

    function getPopover(food) {
        return (
            <Popover id="popover-basic">
            <Popover.Header as="h3">
                <strong>{food.food_name}</strong>
            </Popover.Header>
            <Popover.Body>
                {t("amount_popover")}: &nbsp;&nbsp;
            <div className="div-inline" style={{width: '60px'}}>
                <Form.Select onChange={onChangeAmount} >
                    {foodAmounts.map(amount => {
                        return (
                            <option value={amount}> {amount} </option>
                        )
                    })}
                </Form.Select>
            </div>
                <br/>
            <Link onClick={() => handleAddToShoppingCart(food, amount)}>{t("put_in_shopping_cart_popover")}</Link>
            &nbsp;
            or 
            &nbsp;
            <Link to={`/foods/${input.food.food_id}`}>
                            {t("see_more")}
            </Link>
            </Popover.Body>
            </Popover>
        )
    }


    return (
        <div className="div-inline">
            <Card >
                <Card.Img style={{ height: '10rem' , width: "10rem" }} variant="top" src={input.food.picture_url} />
                {/* <OverlayTrigger
                            trigger="click"
                            placement="top"
                            overlay={getPopover(input.food)}
                            rootClose={true}
                > */}
                        <Card.Body style={{ height: '10rem', width: "10rem" }} onClick={showDetails}>
                                
                                
                                <Card.Title style={{fontSize: "15px"}}>
                                <h6>{input.food.food_name}</h6>
                                </Card.Title>
                                
                                

                                <Card.Text>
                                    ${(input.food.price.toFixed(2))}
                                </Card.Text>

                                <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"15px"}}>
                                        {t("delivery_service")}: {input.food.delivered_by}
                                    </Card.Subtitle> 
                                    
                                
                                    {/* <Link>{t("put_in_shopping_cart")}</Link> */}
                                    
                        </Card.Body>
                    
                    {/* <div className="div-inline" style={{width: '60px'}}>
                        <Form.Select onChange={onChangeAmount} >
                            {foodAmounts.map(amount => {
                                return (
                                    <option value={amount}> {amount} </option>
                                )
                            })}
                        </Form.Select>
                    </div>
                        <br/>
                    <Link onClick={() => handleAddToShoppingCart(input.food, amount)}>{t("put_in_shopping_cart_popover")}</Link>
                    &nbsp;
                    or 
                    &nbsp;
                    <Link to={`/foods/${input.food.food_id}`}>
                                    {t("see_more")}
                    </Link> */}
                {/* </OverlayTrigger> */}
            </Card>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <h3><strong>{input.food.food_name}</strong></h3>
                </Modal.Header>
                <Modal.Body>
                {t("delivery_service")}: {input.food.delivered_by} <br />
                {t("price")}: ${Number(input.food.price).toFixed(2)} <br />
                {t("amount_popover")}: &nbsp;
                <div className="div-inline" style={{width: '60px'}}>
                        <Form.Select onChange={onChangeAmount} >
                            {foodAmounts.map(amount => {
                                return (
                                    <option value={amount}> {amount} </option>
                                )
                            })}
                        </Form.Select>
                </div>
                <br />
                <br />
                        
                </Modal.Body>
                <Modal.Footer>
                        <Button 
                            style={{backgroundColor: "#77cc6d"}} 
                            className="border-0 rounded-0" 
                            size="lg" 
                            onClick={() => handleAddToShoppingCart(input.food, amount)} 
                        >
                                {t("put_in_shopping_cart_popover")}
                        </Button>
                        &nbsp;
                        <Button 
                            style={{backgroundColor: "#77cc6d"}} 
                            className="border-0 rounded-0" 
                            size="lg" 
                            href={`/foods/${input.food.food_id}`}
                        >
                            {t("see_more")}
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}                
                                    