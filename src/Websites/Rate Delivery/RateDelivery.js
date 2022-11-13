import React, {useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import DeliveryServiceDataService from "../../services/deliveryService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

export default function RateDelivery() {
    const [deliveryServices, setDeliveryServices] = useState(["업체를 고르세요"]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [deliveryService, setDeliveryService] = useState("업체를 고르세요");

    useEffect(() => {
        retrieveDeliveryServices();
    }, [])

    function retrieveDeliveryServices() {
        DeliveryServiceDataService.getAllDeliveryServices()
            .then(response => {
                const inputDeliveryServices = [...(new Set(response.data.map(({service_name}) => service_name)))]
                setDeliveryServices([deliveryServices].concat(inputDeliveryServices))
            })
    }

    function onChangeSearchDeliveryService(e) {
        const searchDeliveryService = e.target.value;
        setDeliveryService(searchDeliveryService);
    }

    const handleInputChange = event => {
        const newComment = event.target.value;
        console.log(newComment);
        setComment(newComment);
    };

    function AdjustRating(nextValue) {
        setRating(nextValue);
    }

    function submitReview() {
        console.log(deliveryService);
        if (deliveryService == "업체를 고르세요") {
            return new Error();
        }
        if (comment == "") {

        }
        console.log("test");
        DeliveryServiceDataService.setDeliveryServiceRating(deliveryService, rating);
    }

    return (
        <div>
            <h1>리뷰 작성하기</h1>
            사용한 업체: &nbsp;
            <div className="div-inline" style={{width: '300px'}}>
                <Form.Select onChange={onChangeSearchDeliveryService}>
                    {deliveryServices.map(deliveryService => {
                        if (deliveryService == "업체를 고르세요") {
                            return (
                                <option value={deliveryService}> {deliveryService} </option>
                            )
                        } else {
                            return (
                                <option value={deliveryService}>
                                    {deliveryService}
                                </option>
                            )
                        }
                        
                    })}
                </Form.Select>
            </div>

                별점: 

                <StarRatingComponent 
                    name="rating"
                    value={rating}
                    onStarClick={AdjustRating}
                />

                <br></br>


                <Form.Label htmlFor="reviewTextbox">코멘트: </Form.Label>
                <Form.Control 
                    as="textarea"
                    type="text"
                    id="reviewTextbox"
                    placeholder="(리뷰를 달아주세요)"
                    onChange={handleInputChange}
                    rows={5}
                />
                <Button onClick={submitReview} href="/">리뷰 제출하기</Button>
        </div>
    )
}