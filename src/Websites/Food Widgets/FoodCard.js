import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
                       
import { useDispatch, useSelector } from "react-redux";
import { adjustDynamicShoppingCart, returnDynamicShoppingCart } from "../../redux/actions"
import { addToShoppingCart } from "../HomePage Widgets/ShoppingCart"

import storedRedux from "../../redux/store/store"
                                    
export default function FoodCard(input) {

    // const cartList = useSelector(state=>state.cartList)
    const dispatch = useDispatch()
    const cartList = useSelector(state=>state.cartList)

    const { t } = useTranslation()
    const [amount, setAmount] = useState(1)
    const foodAmounts = [1, 2, 3, 4, 5]

    function onChangeAmount(e) {
        const amount = e.target.value;
        setAmount(amount);
    }


    function handleAddToShoppingCart(food, amount) {
        dispatch(addToShoppingCart(food, amount))
        dispatch(adjustDynamicShoppingCart(food, amount))
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
            <Button onClick={() => handleAddToShoppingCart(food, amount)}>{t("put_in_shopping_cart_popover")}</Button>
            </Popover.Body>
            </Popover>
        )
    }


    return (
        <div className="div-inline">
            <Card style={{ width: '18rem'}}>
                <Card.Img style={{ height: '15rem' }} variant="top" src={input.food.picture_url} />
                <Card.Body style={{ height: '11rem' }}>
                        <Card.Title>
                            {input.food.food_name}
                        </Card.Title>
                        <Card.Text>
                            ${input.food.price}
                        </Card.Text>

                        <Card.Subtitle className="mb-2 text-muted">
                            {t("delivery_service")}: {input.food.delivered_by}
                            </Card.Subtitle> 
                            
                        <Link to={`/foods/${input.food.food_id}`}>
                            {t("see_more")}
                        </Link>&nbsp;&nbsp;&nbsp;
                        <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={getPopover(input.food)}
                            rootClose={true}
                        >
                            <Link>{t("put_in_shopping_cart")}</Link>
                        </OverlayTrigger>
                </Card.Body>
            </Card>
        </div>
    )
}                
                                    