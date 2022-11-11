import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import {useParams} from "react-router-dom";

// 가격, 배달업체, 배달날짜, 이름, 사진

function FoodSpecifics() {
    const initialFoodState = {
        food_id: null,
        food_name: "",
        category: "",
        price: 0,
        delivered_by: "",
        is_set_menu: false
    }

    const {id} = useParams();

    const [food, setFood] = useState(initialFoodState);

    function getFood(id) {
        FoodDataService.getFoodById(id)
            .then(response => {
                setFood(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getFood(id);
    }, [id]);

    return (
        <div>

            <h5>이름: {food.food_name}</h5>
            <h5>사진 입력</h5>
            <h5>가격: ${food.price}</h5>
            <h5>배달업체: {food.delivered_by}</h5>
            <h9> (해당 업체가 마음에 들거나 마음에 들지 않았나요? 그렇다면 <strong><a href="/ratedelivery">리뷰를 작성해주세요</a></strong>!)</h9>
        
        </div>
        


    )
}

export default FoodSpecifics;