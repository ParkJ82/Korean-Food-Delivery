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
import AccountDataService from "../../../services/account";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";


function HomePage() {
    const [foods, setFoods] = useState([]);
    const [searchCategory, setSearchCategory] = useState("전체 음식");
    const [categories, setCategories] = useState(["전체 음식"]);
    const [searchDeliveryService, setSearchDeliveryService] = useState("전체 업체");
    const [deliveryServices, setDeliveryServices] = useState(["전체 업체"]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [dynamicShoppingCart, setDynamicShoppingCart] = useState({});
    const [shoppingCartList, setShoppingCartList] = useState([]);
    const foodAmounts = [1, 2, 3, 4, 5]

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    const [ amount, setAmount ] = useState(1)
    const [arrayLength, setArrayLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // Controls Collapse onClick
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getShoppingCartList();
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServicesAndRatings();
    }, [])

    useEffect(() => {
        const currentTotalCost = getTotalCost()
        setTotalPrice(currentTotalCost)
    }, [shoppingCartList])

    function getPopover(food) {
        return (
            <Popover id="popover-basic">
            <Popover.Header as="h3">
                <strong>{food.food_name}</strong>
            </Popover.Header>
            <Popover.Body>
                수량: &nbsp;&nbsp;
            <div className="div-inline" style={{width: '60px'}}>
                <Form.Select onChange={onChangeAmount} >
                    {foodAmounts.map(amount => {
                        return (
                            <option value={amount}> {amount} </option>
                        )
                    })}
                </Form.Select>
            </div>
                <br/>
            <Button onClick={() => addToShoppingCart(food)}>장바구니에 넣기</Button>
            </Popover.Body>
            </Popover>
        )
    }

    function onChangeAmount(e) {
        const amount = e.target.value;
        setAmount(amount);
    }




    async function getUserIdFromToken(token) {
        try {
            let loginId;
            await AccountDataService.getUserIdFromToken(token)
                .then(response => {
                    loginId = response.data.login_id; 
                })
            return handleLoginId(loginId)
        } catch (err) {
            handleGetError(err)
        }
    }

    function handleLoginId(loginId) {
        if (loginId !== "") {
            return loginId;      
        }
    }

    function handleGetError(error) {
        console.error(error)
    }

    async function getShoppingCartList() {
        getAndSetShoppingCartListFromServer()
            .then(response => {
                const shoppingCart = response.data
                adjustDynamicShoppingCart(shoppingCart);
                return shoppingCart;
                }
            )
        
    }

    async function getAndSetShoppingCartListFromServer() {
        var shoppingCart;
        if (!token) {
            shoppingCart = getShoppingCartFromLocalStorage()
        } else {
        console.log("test")
        await AccountDataService.getShoppingCartFromToken(token)
            .then(response => {
                shoppingCart = getShoppingCartFromDatabaseResponse(response)
            })
        }
        setShoppingCartList(shoppingCart);
        return shoppingCart
    }

    function getShoppingCartFromLocalStorage() {
        var shoppingCart;
        if (localStorage.getItem("shoppingCart")) {
            shoppingCart = returnLocalStorageShoppingCart()
        } else {
            shoppingCart = setAndReturnEmptyLocalStorageShoppingCart()
        }
        return shoppingCart;
    }

    function returnLocalStorageShoppingCart() {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
        return shoppingCart
    }

    function setAndReturnEmptyLocalStorageShoppingCart() {
        var shoppingCart = [];
        localStorage.setItem("shoppingCart", JSON.stringify([]));
        return shoppingCart
    }

    function getShoppingCartFromDatabaseResponse(response) {
        const inputCart = response.data
        console.log(response.data)
        const shoppingCart = getShoppingCartListFromInputCart(inputCart)
        return shoppingCart;
    }

    function getShoppingCartListFromInputCart(inputCart) {
        const shoppingCart = []
        for (let currentFoodIndex = 0; currentFoodIndex < inputCart.length; ++currentFoodIndex) {
            for (let amount = 0; amount < inputCart[currentFoodIndex].amount; ++amount) {
                shoppingCart
                    .push(
                        {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex],
                            category: inputCart[currentFoodIndex].category, price: inputCart[currentFoodIndex].price,
                                delivered_by: inputCart[currentFoodIndex].delivered_by, 
                                    is_set_menu: inputCart[currentFoodIndex].is_set_menu
                    })
            }
        }
        return shoppingCart;
    }

    async function addToShoppingCart(inputFood) {
        if (!token) {
            getShoppingCartFromLocalStorageAndAddFood(inputFood)
        } else {
            AddFoodToDatabaseShoppingCart(inputFood)
        }
        
        setNewTotalPriceWithInputFood(inputFood)
        setShoppingCartListWithInputFood(inputFood)
        adjustDynamicShoppingCart();
    }

    function getShoppingCartFromLocalStorageAndAddFood(food) {
        const shoppingCart = getShoppingCartFromLocalStorage()
        addFoodToLocalStorageShoppingCart(shoppingCart, food)
    }

    function addFoodToLocalStorageShoppingCart(shoppingCart, food) {
        for (let count=0; count < amount; ++count) {
            shoppingCart.push(food)
        }
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    }

    async function AddFoodToDatabaseShoppingCart(food) {
        const login_id = await getUserIdFromToken(token)
        AccountDataService.updateShoppingCart({login_id: login_id, food_id: food.food_id, amount: amount})
        
    }

    async function setNewTotalPriceWithInputFood(inputFood) {
        const newTotalPrice = totalPrice + inputFood.price * amount;
        setTotalPrice(newTotalPrice);
    }

    async function setShoppingCartListWithInputFood(inputFood) {
        for (let count=0; count < amount; ++count) {
            shoppingCartList.push(inputFood);
        }
        setShoppingCartList(shoppingCartList);
    }

    async function retrieveFoods() {
        FoodDataService.getAllFoods()
            .then(response => {
                setFoodsAndArrayLength(response)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    async function setFoodsAndArrayLength(databaseResponse) {
        setFoods(databaseResponse.data);
        setArrayLength(databaseResponse.data.length)
    }
    
    async function retrieveCategories() {
        FoodDataService.getAllFoodCategories()
            .then(response => {
                handleSetCategories(response.data)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    async function handleSetCategories(categories) {
        setCategories(["전체 음식"].concat([...(new Set(categories.map(({category})=>category)))]))
    }

    
    async function retrieveDeliveryServicesAndRatings() {
        DeliveryServiceDataService.getAllDeliveryServiceRatings()
            .then(response => {
                handleSetDeliveryServices(response.data)
            })
            .catch(e => {
                handleGetError(e)
            });
    };

    function handleSetDeliveryServices(deliveryServices) {
        setDeliveryServices([["전체 업체"]]
            .concat([...(new Set(deliveryServices
                .map(({service_name, rating, rated_users})=>[service_name, rating, rated_users])))]));
    }

    async function filterByCategoryAndDeliveryService(inputCategory, inputDeliveryService) {
        if (inputCategory === "국/찌개") {
            inputCategory = "찌개"
        }
        
        FoodDataService.getFoodByCategoryAndDeliveryService(inputCategory, inputDeliveryService)
            .then(response => {
                setFoodsAndArrayLength(response)
            })
            .catch(e => {
                handleGetError(e)
            })
    }

    function onChangeSearchCategory(e) {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
        filterByCategoryAndDeliveryService(searchCategory, searchDeliveryService);
    }

    function onChangeSearchDeliveryService(e) {
        const searchDeliveryService = e.target.value;
        setSearchDeliveryService(searchDeliveryService);
        filterByCategoryAndDeliveryService(searchCategory, searchDeliveryService);
    }

    
    async function adjustDynamicShoppingCart() {
        const { dynamicShoppingCart } = await getDynamicShoppingCartList()
        
        setDynamicShoppingCart(dynamicShoppingCart);
    }

    async function getDynamicShoppingCartList() {
        const dynamicShoppingCart = {};
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            if (shoppingCartList[foodIndex].food_id in dynamicShoppingCart) {
                dynamicShoppingCart[shoppingCartList[foodIndex].food_id].Amount++;
            }
            else {
                dynamicShoppingCart[shoppingCartList[foodIndex].food_id] = 
                {Food: shoppingCartList[foodIndex], Amount: 1}
            }
        }
        return dynamicShoppingCart
    }

    function getTotalCost() {
        var totalPrice = 0;
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            totalPrice += shoppingCartList[foodIndex].price;
        }
        return totalPrice
    }

    function eachDeliveryTotal() {
        const eachDeliveryTotalDictionary = getEachDeliveryTotalDictionary()
        return getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary)
    }

    function getEachDeliveryTotalDictionary() {
        const eachDeliveryTotalDictionary = {};

        for (var key in dynamicShoppingCart) {
            if (dynamicShoppingCart[key].Food.delivered_by in eachDeliveryTotalDictionary) {
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by] 
                += dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount
            } else {
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by]
                    = dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount;
            }
        }

        return eachDeliveryTotalDictionary;
    }

    function getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary) {
        if (eachDeliveryTotalDictionary.length === 0) {
            return (
                <div></div>
            )
        }

        const eachDeliveryTotalList = [];
        for (var deliveryService in eachDeliveryTotalDictionary) {
            eachDeliveryTotalList.push(
                <div className="div-inline">{deliveryService}: ${eachDeliveryTotalDictionary[deliveryService]}</div>
            )
        }

        return eachDeliveryTotalList.map((service) => {
            return (
                service
            )
        })
    }

    function setPagination(inputLength) {
        const paginationLength = getPaginationLength(inputLength)
        return getPaginationHTML(paginationLength)        
    }

    function getPaginationLength(length) {
        let paginationLength;
        if (length % 15 === 0) {
            paginationLength = Math.floor(length / 15);
        }
        else {
            paginationLength = Math.floor(length / 15) + 1;
        }
        return paginationLength;
    }

    function getPaginationHTML(length) {
        const paginationList = generatePaginationHTMLList(length)
        return paginationList.map((page) => {
            return (
                page
            )
        });
    }

    function generatePaginationHTMLList(length) {
        const paginationList = []
        paginationList.push(
            <Pagination.Item>
                이전
            </Pagination.Item>
        )
        for (let index = 0; index < length; length++) {
            paginationList.push(
                <Pagination.Item active={index === 0}>
                    {index + 1}
                </Pagination.Item>
            )
        }
        paginationList.push(
            <Pagination.Item>
                다음
            </Pagination.Item>
        )
        return paginationList
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
                        if (deliveryService[0] === "전체 업체") {
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
            
            <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
            <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>

            총 구매: ${totalPrice} {eachDeliveryTotal()}
            </div>
            <div>
                {foods.map((food) => {
                    return (
                        <div className="div-inline">
                        <Card style={{ width: '18rem'}}>
                            <Card.Img style={{ height: '15rem' }} variant="top" src={food.picture_url} />
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
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="right"
                                        overlay={getPopover(food)}
                                        rootClose={true}
                                    >
                                        <Link>장바구니에 담기</Link>
                                    </OverlayTrigger>
                            </Card.Body>
                        </Card>
                        </div>
                    )
                })}
            </div>

            {/* {setPagination(arrayLength)} */}

            
            
        </div>
    )
};

export default HomePage;