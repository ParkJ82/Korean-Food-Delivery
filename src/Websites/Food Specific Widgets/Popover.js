import React from "react";
import  OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function FoodAmountPopover(input) {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">
                <strong>{input.food_name}</strong>
            </Popover.Header>
            <Popover.Body>
                수량: 
            <Button>장바구니에 넣기</Button>
            </Popover.Body>
        </Popover>
    )
    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
            >
                
            </OverlayTrigger>

        </>
    )
}