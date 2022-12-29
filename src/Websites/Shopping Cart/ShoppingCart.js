import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import account from "../../services/account";
import { useTranslation } from "react-i18next"


export default function ShoppingCart() {
    const { t } = useTranslation()

    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});
    const [shoppingCartList, setShoppingCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    useEffect(() => {
        async function handleShoppingCart() {
            const shoppingCart = await getShoppingCart()
            setShoppingCartList(shoppingCart)
        }
        handleShoppingCart()
    }, [])


    useEffect(() => {
        // async function handleDynamicShoppingCart() {
        //     let dynamicShoppingCart
        //     if (!token) {
        //         dynamicShoppingCart = await getDynamicShoppingCartFromLocalStorage()
        //         setShoppingCartList(dynamicShoppingCart)
        //         setDynamicShoppingCart(dynamicShoppingCart);
        //     } else {
        //         dynamicShoppingCart = await getDynamicShoppingCart()
        //         setDynamicShoppingCart(dynamicShoppingCart);
        //     }
        // }
        // handleDynamicShoppingCart()
        
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
                const newShoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
                console.log(newShoppingCart)
                shoppingCart = await getShoppingCartFromLocalStroage(newShoppingCart)
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

    async function getShoppingCartFromLocalStroage(inputCart) {
        const inputShoppingCart = {};
        for (let index = 0; index < inputCart.length; index++) {
            if (inputCart[index].food_id in inputShoppingCart) {
                inputShoppingCart[inputCart[index].food_id].amount++;
            }
            else {
                inputShoppingCart[inputCart[index].food_id] = 
                {food_name: inputCart[index].food_name, delivered_by: inputCart[index].delivered_by, price: inputCart[index].price, amount: 1}
            }
        }

        console.log(inputShoppingCart)

        const newShoppingCart = []

        for (var currentFood in inputShoppingCart) {
            newShoppingCart.push(inputShoppingCart[currentFood])
        }
        return newShoppingCart;
    }

    // async function getDynamicShoppingCart() {
    //     const inputShoppingCart = {};
    //     console.log(shoppingCartList)
    //     const adjustedShoppingCart = getShoppingCartListFromInputCart(shoppingCartList)
    //     for (let index = 0; index < adjustedShoppingCart.length; index++) {
    //         if (adjustedShoppingCart[index].food_id in inputShoppingCart) {
    //             inputShoppingCart[adjustedShoppingCart[index].food_id].Amount++;
    //         }
    //         else {
    //             inputShoppingCart[adjustedShoppingCart[index].food_id] = 
    //             {Food: adjustedShoppingCart[index], Amount: 1}
    //         }
    //     }
    //     console.log(inputShoppingCart)
    //     return inputShoppingCart
    // }

    // async function getDynamicShoppingCartFromLocalStorage() {
    //     const inputShoppingCart = {};
    //     for (let index = 0; index < shoppingCartList.length; index++) {
    //         if (shoppingCartList[index].food_id in inputShoppingCart) {
    //             inputShoppingCart[shoppingCartList[index].food_id].Amount++;
    //         }
    //         else {
    //             inputShoppingCart[shoppingCartList[index].food_id] = 
    //             {Food: shoppingCartList[index], Amount: 1}
    //         }
    //     }
    //     console.log(inputShoppingCart)
    //     return inputShoppingCart
    // }

    // function getShoppingCartListFromInputCart(inputCart) {
    //     const shoppingCart = []
    //     for (let currentFoodIndex = 0; currentFoodIndex < inputCart.length; ++currentFoodIndex) {
    //         for (let amount = 0; amount < inputCart[currentFoodIndex].amount; ++amount) {
    //             shoppingCart
    //                 .push(
    //                     {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex],
    //                         category: inputCart[currentFoodIndex].category, price: inputCart[currentFoodIndex].price,
    //                             delivered_by: inputCart[currentFoodIndex].delivered_by
    //                 })
    //         }
    //     }
    //     return shoppingCart;
    // }


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
                <td>{(shoppingCartList[index].price * shoppingCartList[index].amount).toFixed(2)}</td>
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
        return totalPrice.toFixed(2)
    }

    return (
        <div>

            장바구니:
            
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
                        <td colSpan={4} text-align="right">{t("total_price")}:</td>
                        <td>{totalPrice}</td>
                    </tr>
                </tbody>

            </Table>

            <Button>구매하기</Button>
            <Button href="/">더 돌아보기</Button>

        </div>
    )
    
}