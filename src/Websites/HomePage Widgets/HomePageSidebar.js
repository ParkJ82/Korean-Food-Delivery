import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form"
import FoodDataService from "../../services/food"
import DeliveryServiceDataService from "../../services/deliveryService";
import Container from "react-bootstrap/Container"
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";

import AccountDataService from "../../services/account";

import { useSelector, useDispatch } from "react-redux"
import { setHomePageFoods, setHomePageDeliveryService, adjustDynamicShoppingCart } from "../../redux/actions";

export default function HomePageSidebar(input) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const searchDeliveryService = useSelector(state=>state.searchDeliveryService)
    const dynamicShoppingCart = useSelector(state=>state.dynamicCart)
    const [ratingsDictionary, setRatingsDictionary] = useState({})
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        async function getRating() {
            let token
            await AccountDataService.getToken()
                .then(async response => {
                    token = response.data
                })

            if (token !== "false") {
                const ratings = {}
            for (let index = 0; index < input.deliveryServices.length; ++index) {
                console.log(input.deliveryServices)
                if (input.deliveryServices[index][0] !== "전체 업체") {
                    console.log(input.deliveryServices[index][0])
                    await DeliveryServiceDataService.getDeliveryServiceRating({delivery_service: input.deliveryServices[index][0]})
                        .then(async (response) => {
                            ratings[input.deliveryServices[index][0]] = response.data.rows[0].rating
                            // setRatingsDictionary({...ratingsDictionary, [input.deliveryServices[index][0]]: response.data.rows[0].rating})
                            console.log(response.data.rows[0].rating)
                        })
                        
                }
            }
            console.log(ratings)
            setRatingsDictionary(ratings)
            }
        }
        getRating()
        
    }, [input.deliveryServices])

    useEffect(() => {
        console.log(ratingsDictionary)
    }, [ratingsDictionary])


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
                <div key={deliveryService}>
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

    async function adjustRating(nextValue, prevValue, name) {
        console.log(name)
        let token
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            setOpened(true)
        } else {
            setRatingsDictionary({...ratingsDictionary, [name]: nextValue})
            DeliveryServiceDataService
                .setNewRating({delivery_service: name, rating: nextValue})
            window.location.reload()
        }
        
    }

    return (
        <Container>
            <Modal show={opened} onHide={() => setOpened(false)}>
                <Modal.Header closeButton>
                    {t("login_required")}
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">{t("go_to_login")}</Link>
                </Modal.Footer>
            </Modal>
        <h3><i class="bi bi-filter"></i> {t("filter")}:</h3>
        {t("delivery_service_category")} ({t("fifth_line")}):
            &nbsp;&nbsp;
            <div>
            {input.deliveryServices.length !== 0 ? input.deliveryServices.map(deliveryService => {
                if (deliveryService[0] === "전체 업체") {
                    return (
                        <Form.Check
                            defaultChecked
                            key="전체 업체"
                            id="전체 업체"
                            type="radio"
                            name="delivery"
                            label={t("all_delivery_services")}
                            onClick={onClickSearchDeliveryService}
                            >

                        </Form.Check>
                    )
                } else {
                    return (
                        <>
                            <Form.Check
                                key={`${deliveryService[0]}`}
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
                
            }) : <div>{t("none")}</div>}
                
            </div>
            <br />
            {t("give_ratings")}:
            <div>
                {input.deliveryServices.length !== 0 ? 
                input.deliveryServices.map(deliveryService => {
                    if (deliveryService[0] !== "전체 업체") {
                        return (
                            <>
                            {deliveryService[0]}: 
                                {/* <Form.Check
                                    key={`${deliveryService[0]}`}
                                    type="radio"
                                    name="delivery"
                                    id={`${deliveryService[0]}`}
                                    label={`${deliveryService[0]}, ${t("rating")}: ${deliveryService[1]}/5.0 
                                    (${deliveryService[2]})`}
                                    onClick={onClickSearchDeliveryService}
                                    >
                                </Form.Check> */}
                                <StarRatingComponent 
                                    value={ratingsDictionary[deliveryService[0]] ? ratingsDictionary[deliveryService[0]]: 0}
                                    onStarClick={adjustRating}
                                    name={deliveryService[0]}
                                />
                                <br />
                                
                            </>
                            
                            
                        )
                }}) : <div>{t("none")}</div>}
            </div>
            <br></br>
            {t("food_category")}:
            <div>
                
                    {input.categories.map(category => {
                        if (category === "전체 음식") {
                            return (
                            <Form.Check
                                key="전체 음식"
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
                                key={category}
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
            <br />
            <br />
            <br />
    </Container>
    )
}