import React from "react";
import TopWidget from "../../Global Widgets/TopWidget";
import '../../components/LetterFonts.css';
import DropDown from "../Dropdown";
import AllFoodCollections from "../AllFoodCollections";


function HomePage(input) {
    

    return (

    <div className="HomePage">
        
        {<TopWidget />}

        <p>요리종류으로 골라보기:</p>

        <p>주의: 몇몇 음식은 주마다 바뀜</p>

        {<DropDown />}

        {<AllFoodCollections category = {input.category} />}

        <button>바로 구매하기</button>
        <button>장바구니에 담기</button>

    </div>
    )
};


export default HomePage;