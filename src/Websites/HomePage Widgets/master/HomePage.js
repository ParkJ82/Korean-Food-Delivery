import React, { useState, useEffect } from "react";
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

    // Current user token
    const [token, setToken] = useState(
        localStorage.getItem("token") ? localStorage.getItem("token") : null)


    const [arrayLength, setArrayLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // Controls Collapse onClick
    const [open, setOpen] = useState(false);

    // Current total price in shopping cart
    const [totalPrice, setTotalPrice] = useState(0);

    // Hashmap: {food_id: {food object, amount}}
    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});

    const [shoppingCartList, setShoppingCartList] = useState([]);


    useEffect(() => {
        getShoppingCart({jwt_token: token});
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServicesAndRatings();
    }, [localStorage.getItem("token"), totalPrice])



    // Gets login_id of coresponding token
    // Parameters: {token: current token}
    // Return: login_id
    async function getUserId(token) {
        try {
            account.getId(token)
                .then(response => {
                    if (response.data.login_id !== "") {
                        return response.data.login_id;
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    // WORK ON THIS LATER
    // Gets shopping cart of corresponding login_id
    // and set totalPrice and dynamicShoppingCart
    // Parameters: token: {jwt_token: current_token}
    // Return: none
    async function getShoppingCart(token) {
        var shoppingCart = []
        // var totalPrice = 0;
        var inputCart = [];
        if (!token.jwt_token) {
            if (localStorage.getItem("shoppingCart")) {
                shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
            } else {
                shoppingCart = [];
                localStorage.setItem("shoppingCart", JSON.stringify([]));
            }
        } else {
        await account.getShoppingCart(token)
            // response: {data: list of {food_id, food_name, category, price, delivered_by, is_set_menu, amount}}
            .then(response => {
                inputCart = response.data
            })
        }
        for (let index = 0; index < inputCart.length; ++index) {
            for (let amount = 0; amount < inputCart[index].amount; ++amount) {
                shoppingCart
                    .push(
                        {food_id: inputCart[index].food_id, food_name: inputCart[index],
                            category: inputCart[index].category, price: inputCart[index].price,
                            delivered_by: inputCart[index].delivered_by, is_set_menu: inputCart[index].is_set_menu
                    })
            }
            // totalPrice += inputCart[index].price * inputCart[index].amount;
        }
        // setTotalPrice(totalPrice);
        setShoppingCartList(shoppingCart);
        adjustDynamicShoppingCart(shoppingCart);
    }

    // Add Food to Shopping Cart and update shoppingCart
    // and Set totalPrice and shoppingCartList to updated values
    // Paremeters: inputFood: food object, token: {jwt_token: current token},
    // totalPrice: current total price before update, shoppingCartList: cart before update
    // Return: none
    async function addToShoppingCart(inputFood, token, totalPrice, shoppingCartList) {
        if (!token.jwt_token) {
            if (localStorage.getItem("shoppingCart")) {
                const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
                shoppingCart.push(inputFood);
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
            } else {
                localStorage.setItem("shoppingCart", JSON.stringify([inputFood]))
            }
        } else {
            const user = getUserId(token);
            await account.updateShoppingCart({user: user, food_id: inputFood.food_id, amount: 1}, token)
        }
        const newTotalPrice = totalPrice + inputFood.price;
        setTotalPrice(newTotalPrice);
        shoppingCartList.push(inputFood);
        console.log(shoppingCartList);
        setShoppingCartList(shoppingCartList);
        adjustDynamicShoppingCart(shoppingCartList);
    }

    // Retrieve foods of size 15 from appropriate page
    // and set foods variable to be a list of food objects
    // also sets array length to be the length of list
    // Parameters: current page number
    // Return: none
    async function retrieveFoods() {
        FoodDataService.getAllFoods()
            .then(response => {
                console.log(response.data);
                setFoods(response.data);
                setArrayLength(response.data.length)
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    // Retrive categories from all foods
    // and set categories to be a list of category strings
    // Parameters: none
    // Return: none
    async function retrieveCategories() {
        FoodDataService.getCategories()
            .then(response => {
                console.log(response.data);
                console.log([...(new Set(response.data.map(({category})=>category)))])
                setCategories(["전체 음식"]
                    .concat([...(new Set(response.data.map(({category})=>category)))]))
            })
            .catch(e => {
                console.log(e);
            });
    };

    
    // Retrive all delivery services and set deliveryServices
    // to be list of delivery service object containing name, rating, rated amount of users
    // Parameters: none
    // Return: none
    async function retrieveDeliveryServicesAndRatings() {
        DeliveryServiceDataService.getAllDeliveryServices()
            .then(response => {
                console.log(response.data);
                setDeliveryServices([["전체 업체"]].concat([...(new Set(response.data.map(({service_name, rating, rated_users})=>[service_name, rating, rated_users])))]));                
            })
            .catch(e => {
                console.log(e);
            });
    };


    // Filters out food based on category and delivery service selected
    // Sets foods after appropriate filter
    // Parameters: inputCategory: string of category, inputDeliveryService: string of delivery service
    // Return: none
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

    // Sets the category to searchCategory 
    // (to be displayed to the chosen one) and filters food accordingly
    // Parameters: e: {target: {value: chosen category from dropdown}}
    // Return: none
    function onChangeSearchCategory(e) {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
        console.log(searchCategory);
        ultimateFilter(searchCategory, searchDeliveryService);
    }

    // Sets the delivery service to searchDeliveryService 
    // (to be displayed to the chosen one) and filters food accordingly
    // Parameters: e: {target: {value: chosen delivery service from dropdown}}
    // Return: none
    function onChangeSearchDeliveryService(e) {
        const searchDeliveryService = e.target.value;
        setSearchDeliveryService(searchDeliveryService);
        ultimateFilter(searchCategory, searchDeliveryService);
    }

    
    // Converts shopping cart list to dynamic shopping cart
    // and sets dynamicShoppingCart = {food_index: {Food Object, amount}}
    // Parameters: shoppingCartList: list of {food_id, food_name, category, price, delivered_by, is_set_menu}
    // Return: none
    async function adjustDynamicShoppingCart(shoppingCartList) {
        const inputShoppingCart = {};
        var totalPrice = 0;
        for (let index = 0; index < shoppingCartList.length; index++) {
            if (shoppingCartList[index].food_id in inputShoppingCart) {
                inputShoppingCart[shoppingCartList[index].food_id].Amount++;
            }
            else {
                inputShoppingCart[shoppingCartList[index].food_id] = 
                {Food: shoppingCartList[index], Amount: 1}
            }
            totalPrice += shoppingCartList[index].price;
        }

        console.log(inputShoppingCart);
        
        setTotalPrice(totalPrice);
        setDynamicShoppingCart(inputShoppingCart);
    }

    // Return subtotals of each delivery service
    // Parameters: inputDictionary: {food_index: {Food Object, amount}}
    // Return: all div of delivery_service.delivered_by: $total of that delivery service
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

    // Makes a pagination based on the length of the input given
    // Parameters: inputLength (length of foods)
    // Return: Pagination <이전>, pages, <다음>
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
                                <Button onClick={() => addToShoppingCart(food, {jwt_token: token}, totalPrice, shoppingCartList)} className="btn btn-primary btn-sm">장바구니에 담기</Button>
                            </Card.Body>
                        </Card>
                        </div>
                    )
                })}
            </div>

            {/* {setPagination(arrayLength)} */}


            <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
            <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>
            

            총 구매: ${totalPrice} {eachDeliveryTotal(dynamicShoppingCart)}
            
            
        </div>
    )
};


export default HomePage;