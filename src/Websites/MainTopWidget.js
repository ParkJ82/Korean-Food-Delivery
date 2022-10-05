import React from "react";
import {Link} from "react-router-dom";

const TopWidget = () => {
    return (
        <div class="TopWidget">
            <p class="Alarm">뉴욕대학교 학생들 전체 메뉴 $1 할인</p>
            <button>
                <h1>반배 - 초간단 한인 반찬 배달</h1>
            </button>
            <Link to="/createaccount" class="Link">회원가입</Link>

            <Link to="/login" class="Link">로그인</Link>
            
            <br></br>
            <p>간단하게 고르고 바로 구매하자!</p>
        </div>
    );
};

export default TopWidget;