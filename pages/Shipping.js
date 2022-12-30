import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { saveShipping } from "./product/cartSlice";
import { useRouter } from "next/router";

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", cart.ShippingAddress.fullName);
    setValue("address", cart.ShippingAddress.address);
    setValue("city", cart.ShippingAddress.city);
    setValue("postalCode", cart.ShippingAddress.postalCode);
  }, [setValue, cart.ShippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode }) => {
    dispatch({
      type: saveShipping,
      payload: { fullName, address, city, postalCode },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        ShippingAddress: {
          fullName,
          address,
          city,
          postalCode,
        },
      })
    );

    router.push("/Payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>

          <input
            {...register("fullName", {
              required: "Please Enter Full Name ",
            })}
            type="text"
            id="fullName"
            className="w-full"
            autoFocus
          ></input>
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>

          <input
            {...register("address", {
              required: "Please Enter Full address ",
              minLength: {
                value: 3,
                message: "address should be more than 2 chars",
              },
            })}
            type="text"
            id="address"
            className="w-full"
            autoFocus
          ></input>
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fullName">City</label>

          <input
            {...register("city", {
              required: "Please Enter City Name ",
            })}
            type="text"
            id="city"
            className="w-full"
            autoFocus
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>

          <input
            {...register("postalCode", {
              required: "Please Enter postal Code ",
            })}
            type="text"
            id="postalCode"
            className="w-full"
            autoFocus
          ></input>
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default Shipping;
Shipping.auth = true;
