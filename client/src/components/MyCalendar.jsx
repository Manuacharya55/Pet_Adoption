import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAdoption } from "../context/PetContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Qy6OKJx3mIqkvw160yw4AWKGgl1VCmUXHgXRITnhJTAdGEKOt60IvAoyubH3taTF46vPjZQOewZF4xTUja92dpf00ymcli1Rc"
);

const CheckoutForm = ({ amount, product,adoptId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user } = useAdoption();
  const navigate = useNavigate();
  console.log(user.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not properly loaded.");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/payment/${adoptId}`,
        {
          petId: product?._id,
          totalAmount: parseFloat(amount),
          paymentMethodId: paymentMethod.id,
          adoptId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      toast.success("Payment Successful! Rent Recorded");
      navigate("/home");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.error || "Payment failed. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="payment-card">
        <label htmlFor="card-element">Card Details</label>
        <CardElement id="card-element" />
      </div>
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Payment Successful!</div>}
    </form>
  );
};

const MyCalendar = ({ product,adoptId }) => {
  return (
    <div id="payment-form">
      <div id="bill">
        <p>Product Name: {product?.productName}</p>
        <p>Category: {product?.category}</p>
        <h1>Price: ₹{parseInt(product?.price)}</h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={parseInt(product?.price)} product={product} adoptId={adoptId}/>
        </Elements>
      </div>
    </div>
  );
};

export default MyCalendar;
