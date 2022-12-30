import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { savePaymentMethod } from "./product/cartSlice";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();
  const paymentMethod = useSelector((state) => state.paymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }

    dispatch({
      type: savePaymentMethod,
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/PlaceOrder");
  };

  useEffect(() => {
    if (!cart.ShippingAddress.address) {
      return router.push("/Shipping");
    }

    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, cart.ShippingAddress.address]);

  const paymentMethods = ["Paypal", "Cash on Delivery"];

  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />

      <form className="mx-auto max-w-screen-md " onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {paymentMethods.map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              id={payment}
              className="p-2 outline-none focus:ring-0"
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="flex justify-between  mb-4">
          <button
            onClick={() => router.push("/Shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default Payment;
Payment.auth = true;
