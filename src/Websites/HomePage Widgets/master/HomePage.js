import React, { useState, useEffect, useContext } from "react";
import '../../components/LetterFonts.css';
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import FoodDataService from "../../../services/food";
import DeliveryServiceDataService from "../../../services/deliveryService"
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
import "../../components/CustomColors.css";

import { useTranslation } from "react-i18next"

import FoodCard from "../../Food Widgets/FoodCard";
import HomePageModal from "../HomePageModal";
import HomePageSidebar from "../HomePageSidebar";

import { useSelector, useDispatch } from "react-redux";
import { setHomePageFoods, returnDynamicShoppingCart } from "../../../redux/actions";
import storedRedux from "../../../redux/store/store";
import { getShoppingCartListFromServerAndSetDynamicShoppingCart } from "../ShoppingCart";

function HomePage() {
    const { t } = useTranslation()
    const foodsList = useSelector(state=>state.foodsList)
    const dispatch = useDispatch()
    const cartList = useSelector(state=>state.cartList)


    function shoppingCartChange() {
        const newShoppingCart = storedRedux.getState().cartList
        const currentTotalCost = getTotalCost(newShoppingCart)
        setTotalPrice(currentTotalCost)
        // dispatch(adjustDynamicShoppingCart(newShoppingCart))
    }

    storedRedux.subscribe(shoppingCartChange)

    // const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState(["전체 음식"]);
    // const [searchDeliveryService, setSearchDeliveryService] = useState("전체 업체");
    const [deliveryServices, setDeliveryServices] = useState(["전체 업체"]);
    const [totalPrice, setTotalPrice] = useState(0);

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    // const [arrayLength, setArrayLength] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);

    // Controls Collapse onClick

    // const [open, setOpen] = useState(false);


    useEffect(() => {
        
        dispatch(getShoppingCartListFromServerAndSetDynamicShoppingCart())
        // dispatch(getShoppingCartListFromServer())
        // dispatch(returnDynamicShoppingCart(cartList))
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServicesAndRatings();
        // dispatch(getShoppingCartListFromServer())
        const currentTotalCost = getTotalCost(cartList)
        setTotalPrice(currentTotalCost)
        
        // dispatch(returnDynamicShoppingCart(cartList))
    }, [])


    // useEffect(() => {
    //     async function handleDynamicShoppingCart() {
    //         const currentTotalCost = getTotalCost(shoppingCartList)
    //         setTotalPrice(currentTotalCost)
    //     }
    //     handleDynamicShoppingCart()
    // }, [shoppingCartList])

    
    

    // function setCardFoods(foods) {
    //     // setFoods([...foods])
    //     dispatch(setHomePageFoods(foods))
    // }

    function handleGetError(error) {
        console.error(error)
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
        // setFoods(databaseResponse.data);
        dispatch(setHomePageFoods(databaseResponse.data))
        // setArrayLength(databaseResponse.data.length)
    }
    
    async function retrieveCategories() {
        FoodDataService.getAllFoodCategories()
            .then(response => {
                handleSetCategories(response.data)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    async function handleSetCategories(categories) {
        setCategories(["전체 음식"].concat([...(new Set(categories.map(({category})=>category)))]))
    }

    
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
        setDeliveryServices([["전체 업체"]]
            .concat([...(new Set(deliveryServices
                .map(({service_name, rating, rated_users, delivery_minimum})=>
                        [service_name, rating, rated_users, delivery_minimum])))]));
    }

    function getTotalCost(shoppingCartList) {
        console.log(shoppingCartList)
        var totalPrice = 0;
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            totalPrice += shoppingCartList[foodIndex].price;
        }
        return totalPrice.toFixed(2)
    }

    // function setPagination(inputLength) {
    //     const paginationLength = getPaginationLength(inputLength)
    //     return getPaginationHTML(paginationLength)        
    // }

    // function getPaginationLength(length) {
    //     let paginationLength;
    //     if (length % 15 === 0) {
    //         paginationLength = Math.floor(length / 15);
    //     }
    //     else {
    //         paginationLength = Math.floor(length / 15) + 1;
    //     }
    //     return paginationLength;
    // }

    // function getPaginationHTML(length) {
    //     const paginationList = generatePaginationHTMLList(length)
    //     return paginationList.map((page) => {
    //         return (
    //             page
    //         )
    //     });
    // }

    // function generatePaginationHTMLList(length) {
    //     const paginationList = []
    //     paginationList.push(
    //         <Pagination.Item>
    //             이전
    //         </Pagination.Item>
    //     )
    //     for (let index = 0; index < length; length++) {
    //         paginationList.push(
    //             <Pagination.Item active={index === 0}>
    //                 {index + 1}
    //             </Pagination.Item>
    //         )
    //     }
    //     paginationList.push(
    //         <Pagination.Item>
    //             다음
    //         </Pagination.Item>
    //     )
    //     return paginationList
    // }

    return (
        <div className="HomePage">
            <Alert><h3>{t("alert")}
            </h3>

            </Alert>
            

            
            <Container fluid={true} className="p-0">
                <Row>
                    <Col sm={2}>
                    
                            <HomePageSidebar deliveryServices={deliveryServices} categories={categories} />
                    
                    </Col>
                    <Col sm={10}>
                        <div>
                        {t("post_rating")} <strong><a href="/ratedelivery">{t("post_rating_two")}</a></strong>!
                        <br></br>

                        {t("membership_alert")}

                        
                        
                        <br></br>
                        <Pagination>
                        </Pagination>
                        
                        <Button href="/purchase" className="btn btn-warning">{t("purchase")}</Button>
                        <Button href="/shoppingcart" className="btn btn-warning">{t("shopping_cart")}</Button>


                        {t("total_price")}: ${totalPrice}
                        <br></br>
                        {foodsList.length === 0 ?
                        <div>{t("no_results")}</div> :
                            foodsList.map((food) => {
                                return (

                                    <div className="div-inline">
                                            <FoodCard food={food}/>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </Col>
                </Row>
            
            </Container>
            {/* {setPagination(arrayLength)} */}

            <HomePageModal />

            
            
        </div>
    )
};

export default HomePage;