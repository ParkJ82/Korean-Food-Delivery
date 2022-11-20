import React, { useState, useEffect, useContext } from "react";
import '../../components/LetterFonts.css';
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import FoodDataService from "../../../services/food";
import DeliveryServiceDataService from "../../../services/deliveryService"
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import Collapse from "react-bootstrap/Collapse";
import account from "../../../services/account";


function HomePage() {
    const [foods, setFoods] = useState([]);
    const [searchCategory, setSearchCategory] = useState("전체 음식");
    const [categories, setCategories] = useState(["전체 음식"]);
    const [searchDeliveryService, setSearchDeliveryService] = useState("전체 업체");
    const [deliveryServices, setDeliveryServices] = useState(["전체 업체"]);
    const [ratingStars, setRatingStars] = useState([]);

    const [arrayLength, setArrayLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(localStorage.getItem("totalPrice") ?
        JSON.parse(localStorage.getItem("totalPrice")) : 0
    );

    const [shoppingCart, setShoppingCart] = useState([]);

    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});

    function getUserId() {
        try {
            account.getId({jwt_token: localStorage.getItem("token")})
                .then(response => {
                    if (response.data.login_id !== "") {
                        return response.data.login_id;
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    // // Work on this later
    // function getShoppingCart() {
    //     const user = getUserId();
    //     account.getShoppingCart({user: user})
    //         .then(response => {
                
    //         })
    // }

    

    function setPagination(inputLength) {
        let paginationLength;
        const paginationList = [];
        if (inputLength % 15 == 0) {
            paginationLength = Math.floor(inputLength / 15);
        }
        else {
            paginationLength = Math.floor(inputLength / 15) + 1;
        }
        paginationList.push(
            <Pagination.Item>
                이전
            </Pagination.Item>
        )
        for (let index = 0; index < paginationLength; paginationLength++) {
            paginationList.push(
                <Pagination.Item active={index == 0}>
                    {index + 1}
                </Pagination.Item>
            )
        }
        paginationList.push(
            <Pagination.Item>
                다음
            </Pagination.Item>
        )
        return paginationList.map((page) => {
            return (
                page
            )
        });
    }


    useEffect(() => {
        getUserId();
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServices();
    }, [])

    // useEffect(() => {
    //     const inputShoppingCart = {};
    //     for (let index = 0; index < user.shoppingCart.length; index++) {
    //         if (user.shoppingCart[index].food_id in inputShoppingCart) {
    //             inputShoppingCart[user.shoppingCart[index].food_id].Amount++;
    //         }
    //         else {
    //             inputShoppingCart[user.shoppingCart[index].food_id] = 
    //             {Food: user.shoppingCart[index], Amount: 1}
    //         }
    //     }
    //     setDynamicShoppingCart(inputShoppingCart);
    // }, [user.shoppingCart]);


    function retrieveFoods(inputPage) {
        FoodDataService.getAllFoods(inputPage)
            .then(response => {
                console.log(response.data);
                setFoods(response.data);
                setArrayLength(response.data.length)
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
                const ratingWithService = [...(new Set(response.data.map(({service_name, ratings})=>[service_name, ratings])))];
                setDeliveryServices([["전체 업체"]].concat([...(new Set(response.data.map(({service_name, ratings, rated_users})=>[service_name, ratings, rated_users])))]));
                setRatingStars(ratingWithService);
                console.log([...(new Set(response.data.map(({service_name})=>service_name)))])
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
                    setArrayLength(response.data.length)
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
                    setArrayLength(response.data.length)
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

    function addToShoppingCart(inputFood) {

        // if (localStorage.getItem("shoppingCart")) {
        //     localStorage.setItem("shoppingCart", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCart")), inputFood]))
        // } else {
        //     localStorage.setItem("shoppingCart", JSON.stringify([inputFood]))
        // }
        // setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")) + inputFood.price)
        // localStorage.setItem("totalPrice", JSON.parse(localStorage.getItem("totalPrice")) + inputFood.price);
        // adjustDynamicShoppingCart();
        const user = getUserId();
        account.updateShoppingCart({user: user, food_id: inputFood.food_id, amount: 1})

    }

    function adjustDynamicShoppingCart() {
        const inputShoppingCart = {};
        const shoppingCartList = JSON.parse(localStorage.getItem("shoppingCart"));
        for (let index = 0; index < shoppingCartList.length; index++) {
            if (shoppingCartList[index].food_id in inputShoppingCart) {
                inputShoppingCart[shoppingCartList[index].food_id].Amount++;
            }
            else {
                inputShoppingCart[shoppingCartList[index].food_id] = 
                {Food: shoppingCartList[index], Amount: 1}
            }
        }
        setDynamicShoppingCart(inputShoppingCart);
    }

    function eachDeliveryTotal(inputDictionary) {
        const totalDictionary = {};
        if (inputDictionary.length == 0) {
            return (
                <div></div>
            )
        }
        for (var key in inputDictionary) {
            if (inputDictionary[key].Food.delivered_by in totalDictionary) {
                totalDictionary[inputDictionary[key].Food.delivered_by] 
                += inputDictionary[key].Food.price * inputDictionary[key].Amount
            } else {
                totalDictionary[inputDictionary[key].Food.delivered_by] = inputDictionary[key].Food.price 
                * inputDictionary[key].Amount;
            }
        }
        const totalList = [];
        for (var deliveryService in totalDictionary) {
            totalList.push(
                <div className="div-inline">{deliveryService}: ${totalDictionary[deliveryService]}</div>
            )
        }
        return totalList.map((service) => {
            return (
                service
            )
        })
    }



    return (

        <div className="HomePage">

            
            <Alert><h3>(주의) 업체마다 배달 규정이 다름:</h3>

            <Button
                onClick={() => setOpen(!open)}
                aria-controls="delivery-text"
                aria-expanded={open}
            >
            배달 규정 보기</Button>
                
            

            <Collapse in={open}>
                    <h6 id="delivery-text">
                        오병이어 배달 최소비: $65
                    </h6>
                </Collapse>
            
            </Alert>

            

            


            배달 업체가 마음에 들거나 마음에 들지 않았나요? 그렇다면 <strong><a href="/ratedelivery">리뷰를 작성해주세요</a></strong>!
            <br></br>

            배달비가 너무 많이 나오세요? 그렇다면 멤버십에 가입하고 배달비를 모두 면제 받으세요!
            
            
            <div className="p-2">

            업체 고르기:
            &nbsp;&nbsp;
            <div className="div-inline" style={{width: '300px'}}>
                <Form.Select onChange={onChangeSearchDeliveryService}>
                    {deliveryServices.map(deliveryService => {
                        if (deliveryService[0] == "전체 업체") {
                            return (
                                <option value={deliveryService}> {deliveryService} </option>
                            )
                        } else {
                            return (
                                <option value={deliveryService[0]}>
                                    {deliveryService[0]}, 평점: {deliveryService[1]}/5.0 (리뷰 수: {deliveryService[2]})
                                </option>
                            )
                        }
                        
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
            <Pagination>
            </Pagination>
            
            
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

                                    <Card.Subtitle className="mb-2 text-muted">
                                        배달업체: {food.delivered_by}
                                        </Card.Subtitle> 
                                        
                                    <Link to={`/foods/${food.food_id}`}>
                                        상세보기
                                    </Link>&nbsp;&nbsp;&nbsp;
                                <Button onClick={() => addToShoppingCart(food)} className="btn btn-primary btn-sm">장바구니에 담기</Button>
                            </Card.Body>
                        </Card>
                        </div>
                    )
                })}
            </div>


            <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
            <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>
            

            총 구매: ${totalPrice} {eachDeliveryTotal(dynamicShoppingCart)}
            
            
        </div>
    )
};


export default HomePage;