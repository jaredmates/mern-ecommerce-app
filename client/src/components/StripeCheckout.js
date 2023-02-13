import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import { Button } from "react-bootstrap";

import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";

function CheckoutForm(props) {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const { data } = await Axios(`/api/stripe/secret/${props.orderId}`);
    const clientSecret = data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: data.order.user.name,
          email: data.order.user.email,
        },
      },
    });

    if (result.error) {
      // Show error
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        props.handleSuccessPayment(result.paymentIntent);
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <Button
        type="submit"
        className="btn-block"
        disabled={!stripe || processing}
      >
        Pay With Stripe
      </Button>
    </form>
  );
}

const StripeCheckout = (props) => (
  <Elements stripe={props.stripe}>
    <CheckoutForm
      orderId={props.orderId}
      handleSuccessPayment={props.handleSuccessPayment}
    />
  </Elements>
);
export default StripeCheckout;
