import React from "react";
import TopWidget from "../Global Widgets/TopWidget";


const LoginWidget = () => {
    return (
        <div>

            {<TopWidget/>}

            <h1>로그인하기</h1>

            <label for="id">아이디: </label>
            <input type="text" name="id" class="account-input"/>

            <br></br>
            <br></br>

            <label for="password">비밀번호: </label>
            <input type="password" name="password" class="account-input"/>

            <br></br>
            <br></br>

            <button>로그인</button>
        </div>
        
    )
    
}

export default LoginWidget;