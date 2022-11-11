import React, {useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import DeliveryServiceDataService from "../../services/deliveryService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

export default function RateDelivery() {
    const [deliveryServices, setDeliveryServices] = useState(["업체를 고르세요"]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        retrieveDeliveryServices();
    }, [])

    function retrieveDeliveryServices() {
        DeliveryServiceDataService.getAllDeliveryServices()
            .then(response => {
                const inputDeliveryServices = [...(new Set(response.data.map(({service_name}) => service_name)))]
                setDeliveryServices(deliveryServices.concat(inputDeliveryServices))
            })
    }

    function onChangeSearchDeliveryService(e) {
        const searchDeliveryService = e.target.value;
        setDeliveryServices(searchDeliveryService);
    }

    const handleInputChange = event => {
        const newComment = event.target.value;
        console.log(newComment);
        setComment(newComment);
    };

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
                    value={5}
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
                <Button>리뷰 제출하기</Button>
        </div>
    )
}