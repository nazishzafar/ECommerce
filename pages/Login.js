import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { getError } from "../utils/error";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/Cart");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Log in">
      <form
        className="mx-auto max-w-screen-md "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 mt-20 text-xl">Log in</h1>
        <div className="mb-4">
          <label htmlFor="email">E-mail</label>

          <input
            {...register("email", {
              required: "Please Enter email ",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter valid email",
              },
            })}
            type="email"
            id="email"
            className="w-full"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Please Enter password ",
              minLength: {
                value: 6,
                message: "password should be more than 5 chars",
              },
            })}
            type="password"
            id="password"
            className="w-full"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Log in</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/Register">Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
