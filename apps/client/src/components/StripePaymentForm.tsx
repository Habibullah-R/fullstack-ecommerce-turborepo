"use client";

import { useAuth } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useCallback } from "react";
import { CartItemsType } from "@repo/types";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import useCartStore from "@/store/cartStore";

const stripePromise = loadStripe(
  "pk_test_51RARMJCkGJl8hueNTvxp2lXbukjrL1WfVSRDuOdhsYTOsGH14R9yeRtGPiPkcj82YAo3wQPrKq6nIRtIC8QUUtsG00frNHE8nI",
);

const StripePaymentForm = () => {
  const {cart} = useCartStore()
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  const fetchClientSecret = useCallback((cart:CartItemsType,token:string) => {
    // Create a Checkout Session
    return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
      method: "POST",
      body:JSON.stringify({cart}),
      headers:{
        "Content-Type":"application/json",
        Authorization:  `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  if (!token) return <div>Loading...</div>;

  const options = { fetchClientSecret : ()=> fetchClientSecret(cart,token) }


  return (
    <>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </>
  );
};

export default StripePaymentForm;
