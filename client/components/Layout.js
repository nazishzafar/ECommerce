import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from "./DropDownLink";
import { cart_Reset } from "../pages/product/cartSlice";

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    signOut({ callbackUrl: "/Login" });
    dispatch({
      type: cart_Reset,
    });
  };

  return (
    <>
      <Script src="https://cdn.tailwindcss.com"></Script>
      <Head>
        <title>{title ? title + "-E-commerce" : "E-commerce"}</title>
        <meta name="description" content="E-Commerce Website" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              The Coffee House
            </Link>
            <div>
              <Link href="/Cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/Profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/OrderHistory"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/Login" className="p-2">
                  {" "}
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-12 justify-center items-center shadow-inner">
          <p>Copyright © 2022 E-commerce</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
