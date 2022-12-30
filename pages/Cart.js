import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { RootState } from "../utils/store";
import { FaTrashAlt } from "react-icons/fa";
import { removeCartItem } from "./product/cartSlice";
import { useRouter } from "next/router";
import { addToCart } from "./product/cartSlice";
import dynamic from "next/dynamic";

const Cart = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItemHandler = (item) => {
    dispatch({ type: removeCartItem, payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({
      type: addToCart,
      payload: { ...item, quantity },
    });
  };

  return (
    <Layout title="Shopping Cart">
      <h3 className="mb-4 text-xl">Shopping Cart</h3>
      {cart.cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Items</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInstock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-right">
                      <button onClick={() => removeItemHandler(item)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 text-xl">
            <ul>
              <li>
                <div className="pb-3">
                  SubTotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  ) : $
                  {cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("Login?redirect=/Shipping")}
                  className="primary-button w-full"
                >
                  Check out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
