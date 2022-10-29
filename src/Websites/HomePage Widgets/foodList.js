import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import { Link } from "react-router-dom";

const FoodsList = props => {
    const [foods, setFoods] = useState([]);
    const [searchName, setSearchname] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [categories, setCategories] = useState(["전체 보기"]);

    useEffect(() => {
        retriveFoods();
        retriveCategories();
    }, []);

    const retriveFoods = () => {
        FoodDataService.getAll()
            .then(response => {
                console.log(response.data);
                setFoods(response.data.Foods);

            })
            .catch(e => {
                console.log(e);
            });
    };


    // fix categories not retriving
    const retriveCategories = () => {
        FoodDataService.getCategories()
            .then(response => {
                console.log(response.data);
                setCatego
            })
    }
}