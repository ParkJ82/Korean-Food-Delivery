import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function ShoppingCart() {
    return (
        <div>

            장바구니:
            
            <Table bordered hover>
                <thread>
                    <tr>
                        <th>#</th>
                        <th>음식명</th>
                        <th>수량</th>
                        <th>배달업체</th>
                        <th>가격</th>
                    </tr>
                </thread>

            </Table>

            <Button>구매하기</Button>
            <Button>더 돌아보기</Button>

        </div>
    )
    
}