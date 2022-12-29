import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form"
import FoodDataService from "../../services/food"

import { useSelector, useDispatch } from "react-redux"
import { setHomePageFoods, setHomePageDeliveryService, adjustDynamicShoppingCart } from "../../redux/actions";

export default function HomePageSidebar(input) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const searchDeliveryService = useSelector(state=>state.searchDeliveryService)
    const dynamicShoppingCart = useSelector(state=>state.dynamicCart)

    function onClickSearchDeliveryService(e) {
        const searchDeliveryService = e.target.id;
        let categoryList = [];
        let checkboxes = document.getElementsByClassName("foods form-check");
        for (let index = 0; index < checkboxes.length; ++index) {
            if (checkboxes[index].firstChild.checked === true) {
                categoryList.push(checkboxes[index].innerText);
            }
        }
        dispatch(setHomePageDeliveryService(searchDeliveryService));
        filterByCategoryAndDeliveryService(categoryList, searchDeliveryService);
    }

    async function filterByCategoryAndDeliveryService(categoryList, inputDeliveryService) {
        FoodDataService.getFoodByCategoryAndDeliveryService(categoryList, inputDeliveryService)
            .then(response => {
                setFoodsAndArrayLength(response)
            })
            .catch(e => {
                handleGetError(e)
            })
    }

    function handleGetError(error) {
        console.error(error)
    }

    function onClickAllFoods(e) {
        let checkboxes = document.getElementsByClassName("foods form-check")
        for (let index = 0; index < checkboxes.length; ++index) {
            checkboxes[index].firstChild.checked = e.target.checked;
        }
        if (e.target.checked) {
            retrieveFoods();
        } else {
            // homepage.setFoods([])
            dispatch(setHomePageFoods([]))
        }
    }

    function onClickSearchCategory(e) {
        let totalCheckBox = document.getElementsByClassName("total form-check")
        let checkboxes = document.getElementsByClassName("foods form-check")
        let allChecked = true;
        let allNotChecked = true;
        const categoryList = []

        if (e.target.checked === false) {
            totalCheckBox[0].firstChild.checked = false;
        } 
        for (let index = 0; index < checkboxes.length; ++index) {
            if (checkboxes[index].firstChild.checked === false) {
                allChecked = false;
            } else {
                categoryList.push(checkboxes[index].innerText)
                allNotChecked = false;
            }
        }
        if (allChecked) {
            totalCheckBox[0].firstChild.checked = true;
        }
        if (allNotChecked) {
            // homepage.setFoods([])
            dispatch(setHomePageFoods([]))
        }

        filterByCategoryAndDeliveryService(categoryList, searchDeliveryService)
    }

    async function retrieveFoods() {
        FoodDataService.getAllFoods()
            .then(response => {
                setFoodsAndArrayLength(response)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    async function setFoodsAndArrayLength(databaseResponse) {
        // homepage.setFoods(databaseResponse.data);
        dispatch(setHomePageFoods(databaseResponse.data))
        // setArrayLength(databaseResponse.data.length)
    }

    function eachDeliveryTotal(dynamicShoppingCart) {
        const eachDeliveryTotalDictionary = getEachDeliveryTotalDictionary(dynamicShoppingCart)
        return getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary)
    }

    function getEachDeliveryTotalDictionary(dynamicShoppingCart) {
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

    function getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary) {
        if (Object.keys(eachDeliveryTotalDictionary).length === 0) {
            return (
                <div>{t("none")}</div>
            )
        }

        const eachDeliveryTotalList = [];
        for (var deliveryService in eachDeliveryTotalDictionary) {
            eachDeliveryTotalList.push(
                <div>
                    {`${deliveryService}: $${eachDeliveryTotalDictionary[deliveryService][0]} 
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

    function getCorrespondingMinimumPrice(inputService) {
        for (let index=0; index < input.deliveryServices.length; ++index) {
            if (inputService === input.deliveryServices[index][0]) {
                return input.deliveryServices[index][3]
            }
        }
    }

    return (
        <div>
        {t("delivery_service_category")}:
            &nbsp;&nbsp;
            <div>
            {input.deliveryServices.map(deliveryService => {
                if (deliveryService[0] === "전체 업체") {
                    return (
                        <Form.Check
                            defaultChecked
                            id="전체 업체"
                            type="radio"
                            name="delivery"
                            label="전체 선택하기"
                            onClick={onClickSearchDeliveryService}
                            >

                        </Form.Check>
                    )
                } else {
                    return (
                        <>
                            <Form.Check
                                type="radio"
                                name="delivery"
                                id={`${deliveryService[0]}`}
                                label={`${deliveryService[0]}, ${t("rating")}: ${deliveryService[1]}/5.0 
                                (${deliveryService[2]})`}
                                onClick={onClickSearchDeliveryService}
                                >
                            </Form.Check>
                            
                        </>
                        
                        
                    )
                    
                }
                
            })}
                
            </div>
            <br></br>
            {t("food_category")}:
            <div>
                
                    {input.categories.map(category => {
                        if (category === "전체 음식") {
                            return (
                            <Form.Check
                                defaultChecked
                                onClick={onClickAllFoods}
                                type="checkbox"
                                label="전체 음식 (All Foods)"
                                className="total"
                                />
                            )
                        }
                        else {
                        return (
                            <Form.Check
                                defaultChecked 
                                onClick={onClickSearchCategory} 
                                type="checkbox"
                                label={category}
                                className="foods"
                                >
                            </Form.Check>
                        )
                        }
                    })}
                
            </div>
            <br></br>

            {t("my_status")}:
            <br></br>
            <div>
            {eachDeliveryTotal(dynamicShoppingCart)}
            </div>
    </div>
    )
}