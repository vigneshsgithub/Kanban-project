'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useActionState } from 'react';


const signupAction = async (_prevState: any, formData: FormData) => {
    console.log("Form submitted:", formData);
  
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return { success: true, message: "Signup successful!" };
  };

 

const page = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [state, formAction] = useActionState(signupAction, { success: false, message: "" });
  return (
    <div className="forgot-password-container">
    <div className="forgot-main-container">
    <h1 className="forgot-text">Reset Password</h1>
    <h3 className="forgot-verification">Paste the link here!</h3>
    <form className="forgot-form">
    <input type="email" className="forgot-input"/> <br />
    <button className="forgot-submit-btn">Submit</button>
    </form>
    </div>
</div>
  )
}

export default page