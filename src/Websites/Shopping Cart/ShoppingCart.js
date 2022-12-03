import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import account from "../../services/account";

export default function ShoppingCart() {
    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});
    const [shoppingCartList, setShoppingCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null;

    useEffect(() => {
        async function handleShoppingCart() {
            const shoppingCart = await getShoppingCart()
            setShoppingCartList(shoppingCart)
        }
        handleShoppingCart()
    }, [])


    useEffect(() => {
        async function handleDynamicShoppingCart() {
            const dynamicShoppingCart = await getDynamicShoppingCart()
            setDynamicShoppingCart(dynamicShoppingCart);
        }
        handleDynamicShoppingCart()
        const currentTotalCost = getTotalCost()
        setTotalPrice(currentTotalCost)
    }, [shoppingCartList])


    async function getShoppingCart() {
        var shoppingCart = [];
        if (!token) {
            if (!sessionStorage.getItem("shoppingCart")) {
                sessionStorage.setItem("shoppingCart", JSON.stringify([]))
                shoppingCart = [];
            }
            else {
                shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
            }
        } else {
            await account.getShoppingCartFromToken(token)
                .then(response => {
                    shoppingCart = response.data
                })
        }
        console.log(shoppingCart)
        return shoppingCart; 
    }

    async function getDynamicShoppingCart() {
        const inputShoppingCart = {};
        console.log(shoppingCartList)
        const adjustedShoppingCart = getShoppingCartListFromInputCart(shoppingCartList)
        for (let index = 0; index < adjustedShoppingCart.length; index++) {
            if (adjustedShoppingCart[index].food_id in inputShoppingCart) {
                inputShoppingCart[adjustedShoppingCart[index].food_id].Amount++;
            }
            else {
                inputShoppingCart[adjustedShoppingCart[index].food_id] = 
                {Food: adjustedShoppingCart[index], Amount: 1}
            }
        }
        return inputShoppingCart
    }

    function getShoppingCartListFromInputCart(inputCart) {
        const shoppingCart = []
        for (let currentFoodIndex = 0; currentFoodIndex < inputCart.length; ++currentFoodIndex) {
            for (let amount = 0; amount < inputCart[currentFoodIndex].amount; ++amount) {
                shoppingCart
                    .push(
                        {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex],
                            category: inputCart[currentFoodIndex].category, price: inputCart[currentFoodIndex].price,
                                delivered_by: inputCart[currentFoodIndex].delivered_by, 
                                    is_set_menu: inputCart[currentFoodIndex].is_set_menu
                    })
            }
        }
        return shoppingCart;
    }


    function getHTMLArray() {
        const outputList = getHTMLArrayFromDynamicShoppingCart()
        return returnIndividualHTML(outputList)
    }

    function getHTMLArrayFromDynamicShoppingCart() {
        const outputList = [];
        var itemNumber = 0;
        console.log(shoppingCartList)
        for (let index = 0; index < shoppingCartList.length; ++index) {
            itemNumber++;
            outputList.push(<tr>
                <td>{itemNumber}</td>
                <td>{shoppingCartList[index].food_name}</td>
                <td>{shoppingCartList[index].amount}</td>
                <td>{shoppingCartList[index].delivered_by}</td>
                <td>{shoppingCartList[index].price * shoppingCartList[index].amount}</td>
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

    function getTotalCost() {
        var totalPrice = 0;
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            totalPrice += shoppingCartList[foodIndex].price * shoppingCartList[foodIndex].amount;
        }
        return totalPrice
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
                    {getHTMLArray()}
                    
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