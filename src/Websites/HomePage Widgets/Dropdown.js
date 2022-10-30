import React, { useState }  from "react";
import Dropdown from "react-bootstrap/Dropdown";



function DropDown() {

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

        // <div className="dropdown">
        
        //     <button className="dropbtn">전체 보기</button>
        //     <div className="dropdown-content">
        //         <a href="/all" className="category">전체 보기</a>
        //         <a href="/meat" className="category">고기류</a>
        //         <a href="/soup" className="category">국/찌개</a>
        //         <a href="/noodle" className="category">면류</a>
        //         <a href="/vegetable" className="category">야채류</a>
        //         <a href="/unidentified" className="category">미분류</a>
        //     </div>
            
        // </div>
        <div className="p-2">
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">전체 보기</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/all">전체 보기</Dropdown.Item>
                <Dropdown.Item href="/meat">고기류</Dropdown.Item>
                <Dropdown.Item href="/soup">국/찌개</Dropdown.Item>
                <Dropdown.Item href="/noodle">면류</Dropdown.Item>
                <Dropdown.Item href="/vegetable">야채류</Dropdown.Item>
                <Dropdown.Item href="/unidentified">미분류</Dropdown.Item>
            </Dropdown.Menu>
            
        </Dropdown>
        </div>
    )
}  



export default DropDown;