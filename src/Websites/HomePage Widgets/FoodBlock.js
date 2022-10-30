import React from "react";
import "../components/LetterFonts.css";

{/* <div className="dropdown">
        
    <button className="dropbtn">전체 보기</button>
    <div className="dropdown-content">
        <a href="/all" className="category">전체 보기</a>
        <a href="/meat" className="category">고기류</a>
        <a href="/soup" className="category">국/찌개</a>
        <a href="/noodle" className="category">면류</a>
        <a href="/vegetable" className="category">야채류</a>
        <a href="/unidentified" className="category">미분류</a>
    </div>
    
</div> */}

function FoodBlock(properties) {
    return (
        <div className="dropdown">
            <button type="button" className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown">
                <p className="blockText">{properties.name}</p>
                <p className="blockText">{properties.price}</p>
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" href={properties.englishName}>제품 상세보기</a>
                </li>
            </ul>

        </div>
        
    );
}


export default FoodBlock;