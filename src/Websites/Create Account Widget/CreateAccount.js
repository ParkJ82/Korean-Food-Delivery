import React from "react";
import TopWidget from "../Global Widgets/TopWidget";



const CreateAccountWebsite = () => {
    return (
        <div>
            
            {<TopWidget />}

            <h1>계정 생성하기</h1>
            <div class="account">
                <label for="name">이름: </label>
                <input type="text" name="name" class="account-input"/>

                <br></br>
                <br></br>

                <label for="number">전화번호: </label>
                <input type="tel" name="number" class="account-input"/>

                <br></br>
                <br></br>

                <label for="id">아이디: </label>
                <input type="text" name="id" class="account-input"/>

                <br></br>
                <br></br>

                <label for="password">비밀번호: </label>
                <input type="password" name="password" class="account-input"/>

                <br></br>
                <br></br>


                <label for="kakao">(선택) 카카오톡 아이디: </label>
                <input type="text" name="kakao" class="account-input"/>

                <br></br>
                <br></br>
                
            </div>

            <button>계정 생성</button>
        </div>
    );
}



export default CreateAccountWebsite;