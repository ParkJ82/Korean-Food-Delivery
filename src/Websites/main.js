import React from "react";
import FoodBlock from "./components/AddFood";
import TopWidget from "./MainTopWidget";
import './components/LetterFonts.css';


const HomePage = () => (
    <div className="HomePage">
        
        {<TopWidget />}


        <button type="submit">요리명으로 골라보기</button>

        {<FoodBlock />}

        <button type="submit">업체명으로 골라보기</button>


        <p>업체 1</p>
        <p>12바구니</p>


        <p>업체 2</p>
        <p>5B2F Meal</p>
    </div>
);


export default HomePage;