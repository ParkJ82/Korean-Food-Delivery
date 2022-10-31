import React from "react";
import Dropdown from "react-bootstrap/Dropdown";



function DropDown() {

    return (

        <div className="p-2">
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="btn btn-success">
                전체 보기
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/all">전체 보기</Dropdown.Item>
                <Dropdown.Item href="/meat">고기류</Dropdown.Item>
                <Dropdown.Item href="/soup">국/찌개</Dropdown.Item>
                <Dropdown.Item href="/noodle">면류</Dropdown.Item>
                <Dropdown.Item href="/vegetable">야채류</Dropdown.Item>
                <Dropdown.Item href="/unidentified">미분류</Dropdown.Item>
            </Dropdown.Menu>
            
        </Dropdown>
        </div>
    )
}  



export default DropDown;