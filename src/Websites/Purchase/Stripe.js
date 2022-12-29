import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import PurchaseDataService from "../../services/purchase"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MB7WmLQmtIT5VrihB1tEaKurBFy3GQO77Y7n5OD6fMATCpTda4xSrCp6V3JXm3ODzS48ckmhocZTSuu5UhjajRS00EWVuJ6Is");

export default function Stripe() {
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        async function createPaymentIntent() {
            
            await PurchaseDataService.createPaymentIntent({ items: { id: "xl-tshirt" } })
                .then((response) => 
                {
                    setClientSecret(response.data.clientSecret)
                }
                )
            
        }
        createPaymentIntent()
        
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret, 
        appearance,
    };

    return (
        <div className="stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}