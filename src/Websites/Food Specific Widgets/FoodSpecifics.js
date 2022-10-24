import React from "react";
import TopWidget from "../Global Widgets/TopWidget";

// 가격, 배달업체, 배달날짜, 이름, 사진

function FoodSpecifics(input) {

    return (
        <div>
            {<TopWidget />}

            <p>이름: {input.infoArray[0]}</p>
            <p>사진 입력</p>
            <p>가격: {input.infoArray[1]}</p>
            <p>배달업체: 맛있게 먹자</p>
            <p>배달 날짜: 9월 17일</p>

        
        </div>
        


    )
}

export default FoodSpecifics;