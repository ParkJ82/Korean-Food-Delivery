import React from "react";
import TopWidget from "../../Global Widgets/TopWidget";
import '../../components/LetterFonts.css';
import DropDown from "../Dropdown";
import AllFoodCollections from "../AllFoodCollections";
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container"


function HomePage(input) {
    

    return (

    <div className="HomePage">

        {<TopWidget />}
        
        <Alert><h1>이번주 행사:</h1></Alert>

        

        <p>주의: 몇몇 음식은 주마다 바뀜</p>

        {<DropDown />} 

        {<AllFoodCollections category = {input.category} />}


        <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
        <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>
        

    </div>
    )
};


export default HomePage;