import "../styles/globals.css";
import cartReducer from "./product/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store } from "../utils/store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps: { session, pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=Login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
