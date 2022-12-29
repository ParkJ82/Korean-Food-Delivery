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

// 가격, 배달업체, 배달날짜, 이름, 사진

function FoodSpecifics() {
    const { id } = useParams();
    const initialFoodState = {
        food_id: null,
        food_name: "",
        category: "",
        price: 0,
        delivered_by: "",
        is_set_menu: false
    }
    const [food, setFood] = useState(initialFoodState);
    // const [foods, setFoods] = useState([]);
    const [rating, setRating] = useState(5);
    const [opened, setOpened] = useState(false);
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    useEffect(() => {
        async function getFoodAndRating() {
            await getFoodById(id);
            if (token !== null && food.delivered_by != "") {
            await DeliveryServiceDataService.getDeliveryServiceRating({jwt_token: token, delivery_service: food.delivered_by})
                .then(async (response) => {
                    console.log(response.data.rows[0].rating)
                    setRating(response.data.rows[0].rating)
                })
            }
        }
        getFoodAndRating()
    }, [food.delivered_by, id, token]);

    function AdjustRating(nextValue) {
        console.log(nextValue)
        if (!token) {
            setOpened(true)
        } else {
            setRating(nextValue);
            DeliveryServiceDataService
                .setNewRating({jwt_token: token, delivery_service: food.delivered_by, rating: nextValue})
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
            <Modal show={opened} onHide={() => setOpened(false)}>
                <Modal.Header closeButton>
                    로그인이 필요한 서비스입니다
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">로그인하러 가기</Link>
                </Modal.Footer>
            </Modal>

            <Container fluid={true} className="p-0">
                <Row>
                    <Col sm={6}>
                        <Image fluid={true} width="100%" src={food.picture_url}/>

                    </Col>
                    <Col sm={6}>
                        <h1>{food.food_name}</h1>
                        <h5>배달업체: {food.delivered_by} &nbsp;</h5>
                        <h9>이 업체에 대한 평점 주기: 
                            <StarRatingComponent 
                                name="rating"
                                value={rating}
                                onStarClick={AdjustRating}
                            /></h9>
                        <h5>가격: ${food.price}</h5>
                        <h5>수량: </h5>
                        <Button>
                            음식 담기
                        </Button>
                        <Button>
                            장바구니 보기
                        </Button>
                        
                    </Col>
                    
                    <Row>
                        <h1></h1>
                        <br/>
                        <br/>
                        <h2>이 업체의 다른 상품 보기</h2>
                        <br/>
                        {/* {foods.map((food) => {
                                return (
                                    <div className="div-inline">
                                    <Card style={{ width: '18rem'}}>
                                        <Card.Img style={{ height: '15rem' }} variant="top" src={food.picture_url} />
                                        <Card.Body style={{ height: '11rem' }}>
                                                <Card.Title>
                                                    {food.food_name}
                                                </Card.Title>
                                                <Card.Text>
                                                    ${food.price}
                                                </Card.Text>

                                                <Card.Subtitle className="mb-2 text-muted">
                                                    {t("delivery_service")}: {food.delivered_by}
                                                    </Card.Subtitle> 
                                                    
                                                <Link to={`/foods/${food.food_id}`}>
                                                    {t("see_more")}
                                                </Link>&nbsp;&nbsp;&nbsp;
                                                <OverlayTrigger
                                                    trigger="click"
                                                    placement="right"
                                                    overlay={getPopover(food)}
                                                    rootClose={true}
                                                >
                                                    <Link>{t("put_in_shopping_cart")}</Link>
                                                </OverlayTrigger>
                                        </Card.Body>
                                    </Card>
                                    </div>)}
                        )} */}

                    </Row>
                    
                </Row>
                
            </Container>            
            
        
        </div>

    )
}

export default FoodSpecifics;