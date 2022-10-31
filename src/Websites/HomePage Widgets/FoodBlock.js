import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function FoodBlock(properties) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                    <Card.Title>
                        {properties.name}
                    </Card.Title>
                    <Card.Text>
                        {properties.price}
                    </Card.Text>    
                <Button className="btn btn-danger btn-sm" href={properties.englishName}>상세보기</Button>

                <Button className="btn btn-primary btn-sm">장바구니에 담기</Button>
            </Card.Body>
        </Card>
        
    );
}


export default FoodBlock;