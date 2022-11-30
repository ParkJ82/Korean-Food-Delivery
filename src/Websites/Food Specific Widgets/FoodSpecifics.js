import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import {useParams} from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-bootstrap/Modal"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    const [rating, setRating] = useState(5);
    const [opened, setOpened] = useState(false);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

    useEffect(() => {
        getFoodById(id);
    }, []);

    function AdjustRating(nextValue) {
        if (!token) {
            setOpened(true)
        } else {
            setRating(nextValue);
        }
    }

    function getFoodById(id) {
        FoodDataService.getFoodById(id)
            .then(response => {
                handleSetFood(response.data);
            })
            .catch(error => {
                handleGetError(error)
            })
    }

    function handleSetFood(food) {
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

            <h5>이름: {food.food_name}</h5>
            <h5>사진 입력</h5>
            <h5>가격: ${food.price}</h5>
            <h5>배달업체: {food.delivered_by}</h5>
            <h9> 배달업체 평점 작성하기: 
                <StarRatingComponent 
                    name="rating"
                    value={rating}
                    onStarClick={AdjustRating}
                />
            </h9>
        
        </div>

    )
}

export default FoodSpecifics;