import React from "react";
import {Link} from "react-router-dom";

const TopWidget = () => {
    return (
        <div className="container-fluid text-bg-info">
            <div className="alert alert-danger">
            뉴욕대학교 학생들 전체 메뉴 <strong>$1 할인</strong>
            </div>
            <div className="text-bg-info">
                <button className="text-bg-info">
                    <h1><a href="/">한반 - 초간단 한인 반찬 배달</a></h1>
                </button>
                <Link to="/createaccount" className="LinkRegister">회원가입</Link>

                <Link to="/login" className="LinkLogin">로그인</Link>

                <button type="button" className="btn btn-warning">고객센터</button>

                <button type="button" className="btn btn-warning">점포면 회사 가입하기!</button>
                
            </div>
            <p className="TopWidget">간단하게 고르고 바로 구매하자!</p>
        </div>
    );
};

export default TopWidget;