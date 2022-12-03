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
import AccountDataService from "../../../services/account";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
import "../../components/CustomColors.css";

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

    const token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
    const [amount, setAmount] = useState(1)
    const [arrayLength, setArrayLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [popoverOpen, setPopoverOpen] = useState(sessionStorage.getItem("false") ? false : true)

    // Controls Collapse onClick
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getShoppingCartList();
        retrieveFoods();
        retrieveCategories();
        retrieveDeliveryServicesAndRatings();
    }, [])

    useEffect(() => {
        async function handleDynamicShoppingCart() {
            const dynamicShoppingCart = await getDynamicShoppingCartList()
            const currentTotalCost = getTotalCost()
            setTotalPrice(currentTotalCost)
            setDynamicShoppingCart(dynamicShoppingCart)
        }
        handleDynamicShoppingCart()
        
    }, [shoppingCartList])

    function handleClose() {
        sessionStorage.setItem("false", "안녕하세요~ :)")
        setPopoverOpen(false)
    }

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
        if (sessionStorage.getItem("shoppingCart")) {
            shoppingCart = returnLocalStorageShoppingCart()
        } else {
            shoppingCart = setAndReturnEmptyLocalStorageShoppingCart()
        }
        return shoppingCart;
    }

    function returnLocalStorageShoppingCart() {
        var shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"))
        return shoppingCart
    }

    function setAndReturnEmptyLocalStorageShoppingCart() {
        var shoppingCart = [];
        sessionStorage.setItem("shoppingCart", JSON.stringify([]));
        return shoppingCart
    }

    function getShoppingCartFromDatabaseResponse(response) {
        const inputCart = response.data
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
        sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
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
                .map(({service_name, rating, rated_users, delivery_minimum})=>
                        [service_name, rating, rated_users, delivery_minimum])))]));
    }

    async function filterByCategoryAndDeliveryService(categoryList, inputDeliveryService) {
        
        FoodDataService.getFoodByCategoryAndDeliveryService(categoryList, inputDeliveryService)
            .then(response => {
                setFoodsAndArrayLength(response)
            })
            .catch(e => {
                handleGetError(e)
            })
    }

    function onClickAllFoods(e) {
        let checkboxes = document.getElementsByClassName("foods form-check")
        for (let index = 0; index < checkboxes.length; ++index) {
            checkboxes[index].firstChild.checked = e.target.checked;
        }
        if (e.target.checked) {
            retrieveFoods();
        } else {
            setFoods([])
        }
        console.log(foods)
    }

    function onClickSearchCategory(e) {
        const searchCategory = e.target.label;
        let totalCheckBox = document.getElementsByClassName("total form-check")
        let checkboxes = document.getElementsByClassName("foods form-check")
        console.log(checkboxes)
        let allChecked = true;
        let allNotChecked = true;
        const categoryList = []

        if (e.target.checked === false) {
            totalCheckBox[0].firstChild.checked = false;
        } 
        for (let index = 0; index < checkboxes.length; ++index) {
            if (checkboxes[index].firstChild.checked === false) {
                allChecked = false;
            } else {
                categoryList.push(checkboxes[index].innerText)
                allNotChecked = false;
            }
        }
        if (allChecked) {
            totalCheckBox[0].firstChild.checked = true;
        }
        if (allNotChecked) {
            setFoods([])
        }
        filterByCategoryAndDeliveryService(categoryList, searchDeliveryService)
    }

    function onClickSearchDeliveryService(e) {
        const searchDeliveryService = e.target.id;
        console.log(searchCategory)
        let categoryList = [];
        if (searchCategory === "전체 음식") {
            let checkboxes = document.getElementsByClassName("foods form-check");
            for (let index = 0; index < checkboxes.length; ++index) {
                categoryList.push(checkboxes[index].innerText);
            }
        }
        console.log(categoryList)
        setSearchDeliveryService(searchDeliveryService);
        filterByCategoryAndDeliveryService(categoryList, searchDeliveryService);
    }

    
    async function adjustDynamicShoppingCart() {
        const dynamicShoppingCart = await getDynamicShoppingCartList()
        setDynamicShoppingCart(dynamicShoppingCart);
    }

    async function getDynamicShoppingCartList() {
        const outputDynamicShoppingCart = {};
        for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
            if (shoppingCartList[foodIndex].food_id in outputDynamicShoppingCart) {
                outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id].Amount++;
            }
            else {
                outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id] = 
                {Food: shoppingCartList[foodIndex], Amount: 1}
            }
        }
        return outputDynamicShoppingCart
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
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by][0] 
                += dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount
            } else {
                const minimumPrice = getCorrespondingMinimumPrice(dynamicShoppingCart[key].Food.delivered_by)
                eachDeliveryTotalDictionary[dynamicShoppingCart[key].Food.delivered_by]
                    = [dynamicShoppingCart[key].Food.price * dynamicShoppingCart[key].Amount, minimumPrice];
            }
        }

        

        return eachDeliveryTotalDictionary;
    }

    function getCorrespondingMinimumPrice(inputService) {
        for (let index=0; index < deliveryServices.length; ++index) {
            if (inputService === deliveryServices[index][0]) {
                return deliveryServices[index][3]
            }
        }
    }

    function getDivFromEachDeliveryTotalDictionary(eachDeliveryTotalDictionary) {
        if (Object.keys(eachDeliveryTotalDictionary).length === 0) {
            return (
                <div>없음</div>
            )
        }

        const eachDeliveryTotalList = [];
        for (var deliveryService in eachDeliveryTotalDictionary) {
            eachDeliveryTotalList.push(
                <div>
                    {`${deliveryService} 구매액: $${eachDeliveryTotalDictionary[deliveryService][0]} 
                    (배달 최소비: $${eachDeliveryTotalDictionary[deliveryService][1]})`}
                </div>
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
            <Alert><h3>(주의) 업체마다 배달 규정이 다름:
                구매하기 전에 배달 최소비를 확인하세요!
            </h3>

                {/* <Link
                    onClick={() => setOpen(!open)}
                    aria-controls="delivery-text"
                    aria-expanded={open}
                >
                배달 규정 펼치기</Link>

                <Collapse in={open}>
                    <h6 id="delivery-text">
                        오병이어 배달 최소비: $65
                    </h6>
                </Collapse> */}

            </Alert>
            

            
            <Container fluid={true} className="p-0">
                <Row>
                    <Col sm={2}>

                    업체 고르기:
                    &nbsp;&nbsp;
                    <div>
                    {deliveryServices.map(deliveryService => {
                        if (deliveryService[0] === "전체 업체") {
                            return (
                                <Form.Check
                                    defaultChecked
                                    id="전체 업체"
                                    type="radio"
                                    name="delivery"
                                    label="전체 선택하기"
                                    onClick={onClickSearchDeliveryService}
                                    >

                                </Form.Check>
                            )
                        } else {
                            return (
                                <>
                                    <Form.Check
                                        type="radio"
                                        name="delivery"
                                        id={`${deliveryService[0]}`}
                                        label={`${deliveryService[0]}, 평점: ${deliveryService[1]}/5.0 
                                        (리뷰 수: ${deliveryService[2]})`}
                                        onClick={onClickSearchDeliveryService}
                                        >
                                    </Form.Check>
                                    
                                </>
                                
                                
                            )
                            
                        }
                        
                    })}
                        
                    </div>
                    <br></br>
                    음식 종류 고르기:
                    <div>
                        
                            {categories.map(category => {
                                if (category == "전체 음식") {
                                    return (
                                    <Form.Check
                                        defaultChecked
                                        onClick={onClickAllFoods}
                                        type="checkbox"
                                        label="전체 음식"
                                        className="total"
                                        />
                                    )
                                }
                                else {
                                return (
                                    <Form.Check
                                        defaultChecked 
                                        onClick={onClickSearchCategory} 
                                        type="checkbox"
                                        label={category}
                                        className="foods"
                                        >
                                    </Form.Check>
                                )
                                }
                            })}
                        
                    </div>
                    <br></br>

                    업체별 내 구매 내역과 배달 최소비:
                    <br></br>
                    <div>
                    {eachDeliveryTotal()}
                    </div>
                    </Col>
                    <Col sm={10}>
                        <div>
                        배달 업체가 마음에 들거나 마음에 들지 않았나요? 그렇다면 <strong><a href="/ratedelivery">리뷰를 작성해주세요</a></strong>!
                        <br></br>

                        배달비가 너무 많이 나오세요? 그렇다면 멤버십에 가입하고 배달비를 모두 면제 받으세요!

                        
                        
                        <br></br>
                        <Pagination>
                        </Pagination>
                        
                        <Button href="/purchase" className="btn btn-warning">바로 구매하기</Button>
                        <Button href="/shoppingcart" className="btn btn-warning">장바구니 보기</Button>


                        총 구매: ${totalPrice}
                        <br></br>
                        {foods.length === 0 ?
                        <div>검색 결과가 없습니다</div> :
                            foods.map((food) => {
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
                            })
                            }
                        </div>
                    </Col>
                </Row>
            
            </Container>
            {/* {setPagination(arrayLength)} */}

            <Modal show={popoverOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <strong>잠깐!</strong>
                </Modal.Header>
                <Modal.Body>
                    <p>업체마다 배달 최소비가 있다는 것을 잊지 말아주세요!</p>
                    <p>(이로 인해 한 번 주문 할 때 하나의 업체를 사용하시는 것을 추천합니다)</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleClose()} variant="danger">쇼핑하러 바로가기</Button>
                    <Button>Change Language To English</Button>
                </Modal.Footer>

            </Modal>

            
            
        </div>
    )
};

export default HomePage;