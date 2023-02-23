import React, { useState, useEffect, useRef } from "react";
import '../../components/LetterFonts.css';
import { Link } from "react-router-dom"

import FoodDataService from "../../../services/food";
import DeliveryServiceDataService from "../../../services/deliveryService"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
import Cardgroup from "react-bootstrap/CardGroup"
import "../../components/CustomColors.css";
import Carousel from "react-bootstrap/Carousel"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"

import { useTranslation } from "react-i18next"

import FoodCard from "../../Food Widgets/FoodCard";
import HomePageModal from "../HomePageModal";
import HomePageSidebar from "../HomePageSidebar";

import { useSelector, useDispatch } from "react-redux";
import { setHomePageFoods } from "../../../redux/actions";
// import storedRedux from "../../../redux/store/store";
import { getShoppingCartListFromServerAndSetDynamicShoppingCart } from "./ShoppingCart";
import Offcanvas from "react-bootstrap/Offcanvas";

function HomePage() {
    const { t } = useTranslation()
    const foodsList = useSelector(state=>state.foodsList)
    const dispatch = useDispatch()
    const menuRef = useRef(null)
    // const cartList = useSelector(state=>state.cartList)
    // const [totalPrice, setTotalPrice] = useState(0);        

    // function shoppingCartChange() {
    //     const newShoppingCart = storedRedux.getState().cartList
    //     const currentTotalCost = getTotalCost(newShoppingCart)
    //     setTotalPrice(currentTotalCost)
    //     // dispatch(adjustDynamicShoppingCart(newShoppingCart))
    // }

    // storedRedux.subscribe(shoppingCartChange)

    // const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState(["전체 음식"]);
    // const [searchDeliveryService, setSearchDeliveryService] = useState("전체 업체");
    const [deliveryServices, setDeliveryServices] = useState([]);
    

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
        // const currentTotalCost = getTotalCost(cartList)
        // setTotalPrice(currentTotalCost)
        
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

    function executeScroll() {
        menuRef.current.scrollIntoView()
    }

    // function getTotalCost(shoppingCartList) {
    //     console.log(shoppingCartList)
    //     var totalPrice = 0;
    //     for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
    //         totalPrice += shoppingCartList[foodIndex].price;
    //     }
    //     return totalPrice.toFixed(2)
    // }

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
            <div className="jumbotron">
                <Container>
                
                {/* <h1 className="display-4">
                    뉴욕에서 한식이 너무 비싸고 맛없어서 화나신가요?
                </h1> */}
                <br />
                <Row>
                <Col md={8}>
                <h1 className="display-4">{t("first_line")} <br />{t("second_line")}</h1>
                
                <p className="lead">
                    {t("third_line")}
                </p>
                {/* <p className="lead">
                    ({t("delivery_recommendation")})
                </p> */}
                
                </Col>
                <Col md={4}>
                    <Image fluid
                        src="https://live.staticflickr.com/2418/2162507366_792c4133cb_b.jpg"
                    />
                </Col>
                </Row>

                <Row>
                <Col md={8}>
                <hr className="my-4" />
                <p>{t("sixth_line")}</p>
                <p class="lead">
                    <Link style={{ textDecoration: 'none', color: 'black' }} onClick={executeScroll}>
                    <h4>{t("see_menu")} <i className="bi bi-chevron-double-down"></i></h4>
                    </Link>
                </p>
                </Col>
                </Row>
                
                <br />
                <br />
                </Container>
            </div>
            <Container fluid={true} className="p-0" ref={menuRef}>
                <Row>
                    <Col md={2}>
                    
                            <HomePageSidebar deliveryServices={deliveryServices} categories={categories} />
                    
                    </Col>
                    
                    <Col md={10}>
                        
                        <Container>

                        <h3><i class="bi bi-list-stars"></i> {t("filter_results")}:</h3>
                        <div>
                        {/* {t("post_rating")} <strong><a href="/ratedelivery">{t("post_rating_two")}</a></strong>!
                        <br></br>

                        {t("membership_alert")} */}

                        {/* <Pagination>
                        </Pagination> */}

                        {/* {t("total_price")}: ${totalPrice} */}
                        <Cardgroup>
                        {foodsList.length === 0 ?
                        <div>{t("no_results")}</div> :
                            
                            foodsList.map((food) => {
                                return (

                                    <div className="div-inline">
                                            <FoodCard food={food}/>
                                            &nbsp;
                                    </div>
                                )
                            })
                            }
                        </Cardgroup>  
                        </div>
                        </Container>
                    </Col>
                </Row>
            
            </Container>
            {/* {setPagination(arrayLength)} */}

            {/* <HomePageModal /> */}

            
            
        </div>
    )
};

export default HomePage;