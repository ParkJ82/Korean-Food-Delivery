import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import PurchaseDataService from "../../services/purchase"
import { useSelector, useDispatch } from "react-redux";
import { getShoppingCartListFromServerAndSetDynamicShoppingCart } from "../HomePage Widgets/master/ShoppingCart";
import storedRedux from "../../redux/store/store";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MOp8NLLHn6spsV6DcdAmVfMaIHxeWgXEmeT1v95zlz7tRAyquBms9RMkHiIy5VQiq7GrIXIxy5Hkiqpwj92799r00lbPCfyIp");



export default function Stripe() {

    const [clientSecret, setClientSecret] = useState("")
    const cartList = useSelector(state=>state.cartList)
    const dynamicShoppingCart = useSelector(state=>state.dynamicCart)
    const dispatch = useDispatch()
    const [paymentCount, setPaymentCount] = useState(0)

    function shoppingCartChange() {
        async function handleIntent(newShoppingCart) {
            if (newShoppingCart.length !== 0 && paymentCount === 0) {
                setPaymentCount(paymentCount + 1)
                await PurchaseDataService.createIntent({
                    shoppingCart: newShoppingCart,

                })
                .then(response => {
                    setClientSecret(response.data.clientSecret)
                    
                })
            }
        }
        const newShoppingCart = storedRedux.getState().cartList
        handleIntent(newShoppingCart)
        
    }
    storedRedux.subscribe(shoppingCartChange)

    useEffect(() => {
        dispatch(getShoppingCartListFromServerAndSetDynamicShoppingCart())
    }, [])

    // const appearance = {
    //     theme: 'stripe', 
    //     variables: {
    //         fontfamily: "DoHyeon",
    //     }
    // }

    const options = {
        clientSecret,
        fonts: [
            {
                // src: 'url(../components/fonts/DoHyeon-Regular.ttf)',
                // family: "DoHyeon",
                // weight: "normal",
                cssSrc: "https://fonts.googleapis.com/css?family=Do+Hyeon",
            },
        ],
        locale: document.cookie.slice(document.cookie.length - 2, document.cookie.length)
        // appearance
    }

    return (
        <div className="stripe">
            {clientSecret && 
                <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm dynamicShoppingCart={dynamicShoppingCart}/>
                </Elements>
            }
        </div>
        
    )
}