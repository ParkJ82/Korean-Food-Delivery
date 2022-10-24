import React, { useState }  from "react";




function Dropdown() {

    // window.onload = function() {
    //     var categoryClasses = document.querySelectorAll(".category");
    //     for (let categoryIndex = 0; categoryIndex < categoryClasses.length; categoryIndex++) {
    //         categoryClasses[categoryIndex].addEventListener("click", function() {
    //         document.querySelector(".dropbtn").innerHTML = categoryClasses[categoryIndex].innerHTML;
            
    //         if (document.querySelector(".dropbtn").innerHTML === "전체 보기") {
    //             setFilter("All")
    //             foodlist = FOODDATA.filter(FILTERMAP[filter])
    //             .map((food) => (<FoodBlock key={food.name} name={food.name} price={food.price}/>)
    //             )
    //         }
    //         else {
    //             setFilter("All")
    //             setFilter("Active")
    //             foodlist = FOODDATA.filter(FILTERMAP[filter])
    //             .map((food) => (<FoodBlock key={food.name} name={food.name} price={food.price}/>)
    //             )
    //         }
    //         })
    //     }
    // }
    

    
    

    return (

        <div className="dropdown">
        
            <button className="dropbtn">전체 보기</button>
            <div className="dropdown-content">
                <a href="/all" className="category">전체 보기</a>
                <a href="/meat" className="category">고기류</a>
                <a href="/soup" className="category">국/찌개</a>
                <a href="/noodle" className="category">면류</a>
                <a href="/vegetable" className="category">야채류</a>
                <a href="/unidentified" className="category">미분류</a>
            </div>
            
        </div>
    )
}  



export default Dropdown;