import React from "react";
import FoodBlock from "./FoodBlock"




function AllFoodCollections(input) {
    
    const FOODDATA = [
        {id: 0, name: "된장찌개", englishName: "soybean-paste-stew", category: "국/찌개", price: "$10.00"},
        {id: 1, name: "잡채", englishName: "Japchae", category: "면류", price: "$7.00"},
        {id: 2, name: "김치찌개", englishName: "Kimchi-stew", category: "국/찌개", price: "$10.00"},
        {id: 3, name: "무쌈", englishName: "radish-slices", category: "야채류", price: "$5.00"},
        {id: 4, name: "삼겹살", englishName: "pork-belly", category: "고기류", price: "$18.00"},
        {id: 5, name: "불고기", englishName: "Bulgogi", category: "고기류", price: "$12.00"},
        {id: 6, name: "간장", englishName: "Soy-sauce", category: "미분류", price: "$3.00"}
      ]

    var FILTERMAP = {
        All: () => true,
        Active: (food) => food.category === input.category
    }
    
    var filter;
    if (input.category == "전체 보기") {
        filter = "All"
    }
    else {
        filter = "Active"
    }


    var foodlist = FOODDATA.filter(FILTERMAP[filter])
    .map((food) =>
    (<FoodBlock 
    key={food.id}
    name={food.name}
    price={food.price}
    englishName={food.englishName}
    />)
    )


    return (
        <div className="d-flex">
            {foodlist}
        </div>
    )
        
}

export default AllFoodCollections;