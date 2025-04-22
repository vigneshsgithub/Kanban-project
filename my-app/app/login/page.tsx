"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="email-input">Email:</label><br />
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className="email"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <br />

        <label className="password-input">Password:</label><br />
        <input
          {...register("password", {
            required: "Password should not be empty",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
          })}
          type="password"
          className="password"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <br />

        <div className="forgot-password">
          <Link href="/forgot-password"><span>Forgot Password?</span></Link>
        </div>

        <input type="submit" className="login-button login-button-container" value="Login" />

        {loginError && <p className="text-red-500 mt-2">"invalid credentials provided!!"</p>}
        <Link href="/signup"><span className="account-creation">Don't have an account? Signup</span></Link>
      </form>
    </div>
  );
};

export default Page;
