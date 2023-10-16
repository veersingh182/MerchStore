import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import "./payment.css";

// const getStripePublicKey = async () => {
//     // return;
//     const { data } = fetch(
//         process.env.REACT_APP_BACKEND + "payment/getPaymentKey"
//     );
//     return data.STRIPE_PUBLISHABLE_KEY;
// };

// const StripePublicKey = await getStripePublicKey();

export default function PaymentPage() {
  const [Key, setKey] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { orderId } = useParams();
  const { REACT_APP_BACKEND } = process.env;
  useEffect(() => {
    const fetchData = async () => {
      var data = await fetch(
        process.env.REACT_APP_BACKEND + "payment/getPaymentKey"
      );
      data = await data.json();
      setKey(data["STRIPE_PUBLISHABLE_KEY"]);
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(REACT_APP_BACKEND + "payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  if (!Key) {
    return <></>;
  }
  const stripePromise = loadStripe(Key);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
