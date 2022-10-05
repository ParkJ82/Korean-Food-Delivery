import React from "react";

const CreateAccountWebsite = () => {
    return (
        <div>
            <h1>계정 생성하기</h1>
            <p>이름: </p>
            <input type="text"/>

            <br></br>

            <p>전화번호: </p>
            <input type="text"/>

            <br></br>

            <p>아이디: </p>
            <input type="text"/>

            <br></br>

            <p>비밀번호: </p>
            <input type="text"/>

            <br></br>

            <p>(선택) 카카오톡 아이디</p>
            <input type="text"/>


            <button>계정 생성</button>
        </div>
    );
}

export default CreateAccountWebsite;