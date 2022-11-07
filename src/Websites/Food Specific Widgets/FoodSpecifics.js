import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";

// 가격, 배달업체, 배달날짜, 이름, 사진

function FoodSpecifics({match}) {
    const initialFoodState = {
        food_id: null,
        food_name: "",
        category: "",
        price: 0,
        delivered_by: "",
        is_set_menu: false
    }

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
        getFood(match.params.id);
    }, [match.params.id]);

    return (
        <div>

            <h5>이름: {food.food_name}</h5>
            <h5>사진 입력</h5>
            <h5>가격: ${food.price}</h5>
            <h5>배달업체: {food.delivered_by}</h5>
            <h5>배달 날짜: 9월 17일</h5>

        
        </div>
        


    )
}

export default FoodSpecifics;