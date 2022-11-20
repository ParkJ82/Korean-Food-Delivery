import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import account from "../../services/account";

export default function ShoppingCart() {
    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});
    const [shoppingCart, setShoppingCart] = useState(
        // localStorage.getItem("shoppingCart") ? 
        // JSON.parse(localStorage.getItem("shoppingCart")) : 
        [])
    const [totalPrice, setTotalPrice] = useState(localStorage.getItem("totalPrice") ?
        JSON.parse(localStorage.getItem("totalPrice")) : 0
    );

    function getUserId() {
        try {
            account.getId({jwt_token: localStorage.getItem("token")})
                .then(response => {
                    if (response.data.login_id !== "") {
                        return response.data.login_id;
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function getShoppingCart() {
        const user = getUserId();
        account.getShoppingCart({user: user})
            .then(response => {
            })
    }

    useEffect(() => {
        getShoppingCart()
        const inputShoppingCart = {};
        for (let index = 0; index < shoppingCart.length; index++) {
            if (shoppingCart[index].food_id in inputShoppingCart) {
                inputShoppingCart[shoppingCart[index].food_id].Amount++;
            }
            else {
                inputShoppingCart[shoppingCart[index].food_id] = 
                {Food: shoppingCart[index], Amount: 1}
            }
        }
        setDynamicShoppingCart(inputShoppingCart);
        console.log(inputShoppingCart)
    }, [shoppingCart])

    function dictionaryToArray(inputDictionary) {
        const outputList = [];
        var itemNumber = 0;
        for (var key in inputDictionary) {
            itemNumber++;
            if (inputDictionary.hasOwnProperty(key)) {
                outputList.push(<tr>
                    <td>{itemNumber}</td>
                    <td>{inputDictionary[key].Food.food_name}</td>
                    <td>{inputDictionary[key].Amount}</td>
                    <td>{inputDictionary[key].Food.delivered_by}</td>
                    <td>{inputDictionary[key].Food.price}</td>
                </tr>)
            }
        }
        return outputList.map((food) => {
            return (
                food
            )
        })
    }

    return (
        <div>

            장바구니:
            
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>음식명</th>
                        <th>수량</th>
                        <th>배달업체</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {dictionaryToArray(dynamicShoppingCart)}
                    
                    <tr>
                        <td colSpan={4} text-align="right">총 가격:</td>
                        <td>{totalPrice}</td>
                    </tr>
                </tbody>

            </Table>

            <Button>구매하기</Button>
            <Button href="/">더 돌아보기</Button>

        </div>
    )
    
}