import React, { useState } from "react";
import { useNavigate } from "react-router";

function FoodInput() {
    const [food, setFood] = useState({
        id: "",
        name: "",
        englishName: "",
        category: "",
        price: ""
    });
    const navigate = useNavigate();

    function updateFood(value) {
        return setFood((currentFood) => {
            return {...currentFood, ...value};
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        const newFood = {...food};

        


        setFood({ id: "", name: "", englishName: "", category: "", price: "" })
    }

    return (
        <div>
        </div>
    )
}

export default FoodInput;