import React, { useState, useEffect } from "react";
import '../../components/LetterFonts.css';
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import FoodDataService from "../../../services/food";
import DeliveryServiceDataService from "../../../services/deliveryService"
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";


function HomePage() {
    const [foods, setFoods] = useState([]);
    const [searchCategory, setSearchCategory] = useState("전체 음식");
    const [categories, setCategories] = useState(["전체 음식"]);
    const [searchDeliveryService, setSearchDeliveryService] = useState("전체 업체");
    const [deliveryServices, setDeliveryServices] = useState(["전체 업체"]);


    useEffect(() => {
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServices();
    }, []);

    function retrieveFoods() {
        FoodDataService.getAllFoods()
            .then(response => {
                console.log(response.data);
                setFoods(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    function retrieveCategories() {
        FoodDataService.getCategories()
            .then(response => {
                console.log(response.data);
                console.log([...(new Set(response.data.map(({category})=>category)))])
                setCategories(["전체 음식"].concat([...(new Set(response.data.map(({category})=>category)))]))
            })
            .catch(e => {
                console.log(e);
            });
    };

    function retrieveDeliveryServices() {
        DeliveryServiceDataService.getAllDeliveryServices()
            .then(response => {
                console.log(response.data);
                console.log([...(new Set(response.data.map(({service_name})=>service_name)))])
                setDeliveryServices(["전체 업체"].concat([...(new Set(response.data.map(({service_name})=>service_name)))]));
            })
            .catch(e => {
                console.log(e);
            });
    };


    function ultimateFilter(inputCategory, inputDeliveryService) {
        var soupCategory = "찌개";
        if (inputCategory == "국/찌개") {
            FoodDataService.filterByCategoryAndDeliveryService(soupCategory, inputDeliveryService)
                .then(response => {
                    console.log(response.data);
                    setFoods(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            FoodDataService.filterByCategoryAndDeliveryService(inputCategory, inputDeliveryService)
                .then(response => {
                    console.log(response.data);
                    setFoods(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        
    }

    function onChangeSearchCategory(e) {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
        console.log(searchCategory);
        ultimateFilter(searchCategory, searchDeliveryService);
    }

    function onChangeSearchDeliveryService(e) {
        const searchDeliveryService = e.target.value;
        setSearchDeliveryService(searchDeliveryService);
        ultimateFilter(searchCategory, searchDeliveryService);
    }



    return (

        <div className="HomePage">

            
            <Alert><h3>(주의) 업체마다 배달 미니멈이 있음:</h3></Alert>

            

            <p>주의: 몇몇 음식은 주마다 바뀜</p>
            
            
            <div className="p-2">

            업체 고르기:
            &nbsp;&nbsp;
            <div className="div-inline" style={{width: '300px'}}>
                <Form.Select onChange={onChangeSearchDeliveryService}>
                    {deliveryServices.map(deliveryService => {
                        return (
                        <option value={deliveryService}> {deliveryService} </option>
                        )
                    })}
                </Form.Select>
            </div>
            &nbsp;&nbsp;
            음식 종류 고르기:
            &nbsp;&nbsp;
            <div className="div-inline" style={{width: '300px'}}>
                <Form.Select onChange={onChangeSearchCategory} >
                    {categories.map(category => {
                        return (
                            <option value={category}> {category} </option>
                        )
                    })}
                </Form.Select>
            </div>
            
            <br></br>
            
            </div>
            <div>
                {foods.map((food) => {
                    return (
                        <div className="div-inline">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                    <Card.Title>
                                        {food.food_name}
                                    </Card.Title>
                                    <Card.Text>
                                        ${food.price}
                                    </Card.Text>
                                        
                                    <Link to={`/foods/${food.food_id}`}>
                                        상세보기
                                    </Link>&nbsp;&nbsp;&nbsp;
                                <Button className="btn btn-primary btn-sm">장바구니에 담기</Button>
                            </Card.Body>
                        </Card>
                        </div>
                    )
                })}
            </div>


            <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
            <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>
            

        </div>
    )
};


export default HomePage;