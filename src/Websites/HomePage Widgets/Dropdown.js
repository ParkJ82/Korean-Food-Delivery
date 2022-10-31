import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../components/LetterFonts.css"


function DropDown(input) {

    return (

        <div className="p-2">

        업체 고르기:

        <Dropdown className="div-inline">
            <Dropdown.Toggle id="dropdown-basic" className="btn btn-success">
                전체 업체
            </Dropdown.Toggle>
        </Dropdown>
        
        음식 종류 고르기: 
        <Dropdown className="div-inline">
            <Dropdown.Toggle id="dropdown-basic" className="btn btn-success">
                {input.category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/all">전체 음식</Dropdown.Item>
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