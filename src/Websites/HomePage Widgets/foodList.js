import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import { Link } from "react-router-dom";

const FoodsList = props => {
    const [foods, setFoods] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [categories, setCategories] = useState(["전체 보기"]);

    useEffect(() => {
        retriveFoods();
        retriveCategories();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchCategory = e => {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
    };

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
                setCategories(["전체 보기"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshFoodList = () => {
        retriveFoods();
    };

    const find = (query, by) => {
        FoodDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setFoods(response.data.FOods);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        find(searchName, "name")
    }

    const findByCategory = () => {
        if (searchCategory == "전체 보기") {
            refreshFoodList();
        } else {
            find(searchCategory, "category")
        }
    }


}