import React from "react";
import TopWidget from "./Global Widgets/TopWidget";

function Purchase () {
    return (
        <div>
            {<TopWidget />}
        
            <p>입력:</p>
            <p>비밀번호: </p>
            <p>기한: </p>
            <p>주소: </p>
        </div>
        
    )
}

export default Purchase;