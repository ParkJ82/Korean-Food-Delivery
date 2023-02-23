import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import {useParams} from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-bootstrap/Modal"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeliveryServiceDataService from "../../services/deliveryService";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import FoodCard from "../Food Widgets/FoodCard";
import AccountDataService from "../../services/account";
import '../components/LetterFonts.css'
import { t } from "i18next";
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux";
import { adjustDynamicShoppingCart } from "../../redux/actions"
import { addToShoppingCart } from "../HomePage Widgets/master/ShoppingCart"


// 가격, 배달업체, 배달날짜, 이름, 사진

function FoodSpecifics() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const initialFoodState = {
        food_id: null,
        food_name: "",
        category: "",
        price: 0,
        delivered_by: "",
        is_set_menu: false
    }
    const [food, setFood] = useState(initialFoodState);
    const [amount, setAmount] = useState(1)
    // const [foods, setFoods] = useState([]);
    const [rating, setRating] = useState(0);
    const [opened, setOpened] = useState(false);
    const [foodsList, setFoodsList] = useState([]);
    const foodAmounts = [1, 2, 3, 4, 5]
    // const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    useEffect(() => {
        async function getFoodAndRating() {
            let token
            await getFoodById(id);
            await AccountDataService.getToken()
                .then(async response => {
                    token = response.data
                })
            if (token !== "false" && food.delivered_by != "") {
            await DeliveryServiceDataService.getDeliveryServiceRating({delivery_service: food.delivered_by})
                .then(async (response) => {
                    setRating(response.data.rows[0].rating)
                })
            }
        }

        async function setAllFoodsList() {
            let categories = []
            await FoodDataService.getAllFoodCategories()
                .then(async response => {
                    categories = [...(new Set(response.data.map(({category})=>category)))]
                })
            await FoodDataService.getFoodByCategoryAndDeliveryService(categories, food.delivered_by) 
                .then(async response => {
                    setFoodsList(response.data)
                })
            }
        getFoodAndRating()
        setAllFoodsList()
    }, [food.delivered_by, id]);

    function onChangeAmount(e) {
        const amount = e.target.value;
        setAmount(amount);
    }

    function handleAddToShoppingCart(amount) {
        dispatch(addToShoppingCart(food, amount))
        dispatch(adjustDynamicShoppingCart(food, amount))
    }

    

    async function AdjustRating(nextValue) {
        let token
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            setOpened(true)
        } else {
            setRating(nextValue);
            DeliveryServiceDataService
                .setNewRating({delivery_service: food.delivered_by, rating: nextValue})
        }
    }

    async function getFoodById(id) {
        await FoodDataService.getFoodById(id)
            .then(async (response) => {
                await handleSetFood(response.data);
            })
            .catch(error => {
                handleGetError(error)
            })
    }

    async function handleSetFood(food) {
        setFood(food)
    }

    function handleGetError(error) {
        console.log(error)
    }

    return (
        <div>
            
            <Container>
                <br />
            <Modal show={opened} onHide={() => setOpened(false)}>
                <Modal.Header closeButton>
                    {t("login_required")}
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">{t("go_to_login")}</Link>
                </Modal.Footer>
            </Modal>
            <Container fluid={true} className="p-0">
                <Row>
                    <Col sm={6}>
                        <Image fluid={true} width="100%" src={food.picture_url}/>

                    </Col>
                    <Col sm={6}>
                        <h1>{food.food_name}</h1>
                        <h5>{t("delivery_service")}: {food.delivered_by} &nbsp;</h5>
                        <h5 className="div-inline">{t("give_rating")}: </h5> &nbsp;
                            <StarRatingComponent 
                                className="div-inline"
                                name="rating"
                                value={rating}
                                onStarClick={AdjustRating}
                            />
                        <h5>{t("price")}: ${food.price}</h5>
                        <h5 className="div-inline">{t("amount_popover")}: </h5> &nbsp;
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
                        <Button 
                            style={{backgroundColor: "#77cc6d"}} 
                            className="border-0 rounded-0" 
                            size="lg"
                            onClick={() => handleAddToShoppingCart(amount)}
                            href="/"
                        >
                            {t("put_in_shopping_cart")}
                        </Button>
                        &nbsp;
                        <Button 
                            href="/shoppingcart" 
                            style={{backgroundColor: "#77cc6d"}} 
                            className="border-0 rounded-0" 
                            size="lg"
                        >
                            {t("view_shopping_cart")}
                        </Button>
                        

                    </Col>
                </Row>
            </Container>
            </Container>
                    <Row>
                        <Container fluid={true}>
                        <h1></h1>
                        <br/>
                        <br/>
                        <Container>
                        <h2>{t("see_different_foods")}</h2>
                        </Container>
                        <br/>
                        
                        {foodsList.map((food) => {
                            return (
                                <div className="div-inline">
                                    <FoodCard food={food}/>
                                    &nbsp;
                                </div>
                            )
                        })}
                        </Container>
                    </Row>
                    
                
                        
        
        
        </div>

    )
}

export default FoodSpecifics;