"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  confirm_password: string;
};

const Page = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [formData, setFormData] = useState<FormData | null>(null); // For triggering useEffect
  const [serverResponse, setServerResponse] = useState<string>("");
  const router = useRouter();
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    setFormData(data); // Set form data to trigger useEffect
  };

  useEffect(() => {
    const postUser = async () => {
      if (!formData) return;

      try {
        const res = await fetch("http://localhost:8000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // optional
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setServerResponse("Signup successful!");
          router.push("/dashboard");
        } else {
          setServerResponse(data.message || "Signup failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        setServerResponse("An error occurred while signing up.");
      }
    };

    postUser();
  }, [formData, router]);

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

        <label className="password-input">Confirm Password:</label><br />
        <input
          {...register("confirm_password", {
            required: "Confirm password should not be empty",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          className="password"
          placeholder="Confirm your password"
        />
        {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
        <br />

        <input type="submit" className="login-button login-button-container" value="Sign Up" />
        {serverResponse && <p className="text-green-500">{serverResponse}</p>}
        
        <Link href="/login"><span className="account-creation">Already have an account? Login</span></Link>
      </form>
    </div>
  );
};

export default Page;
