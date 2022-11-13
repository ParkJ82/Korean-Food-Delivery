import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import LoginContext from "../../login-context";
import { useState } from "react";

export default function ShoppingCart() {
    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});
    const user = useContext(LoginContext);

    useEffect(() => {
        const inputShoppingCart = {};
        for (let index = 0; index < user.shoppingCart.length; index++) {
            if (user.shoppingCart[index].food_id in inputShoppingCart) {
                inputShoppingCart[user.shoppingCart[index].food_id].Amount++;
            }
            else {
                inputShoppingCart[user.shoppingCart[index].food_id] = 
                {Food: user.shoppingCart[index], Amount: 1}
            }
        }
        setDynamicShoppingCart(inputShoppingCart);
        console.log(inputShoppingCart)
    }, [user.shoppingCart])



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
                        <td>{user.totalCost}</td>
                    </tr>
                </tbody>

            </Table>

            <Button>구매하기</Button>
            <Button href="/">더 돌아보기</Button>

        </div>
    )
    
}