// 'use client'

// import Link from "next/link";
// import { useForm } from 'react-hook-form';
// import { startTransition, useActionState, useEffect } from 'react';
// import { useRouter } from "next/router";
//  // Importing useRouter for client-side routing

// type FormData = {
//   email: string;
// };

// const signupAction = async (_prevState: any, formData: FormData) => {
//   console.log("Form submitted:", formData);

//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return { success: true, message: "Signup successful!" };
// };

// const Page = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
//   const [state, formAction] = useActionState(signupAction, { success: false, message: "" });

//   const router = useRouter(); // Using useRouter hook for client-side navigation

//   const onSubmit = (data: FormData) => {
//     startTransition(async () => {
//       const result = await formAction(data);
//       if (result?.success) {
//         router.push("/reset-password"); // Redirecting to reset-password page
//       }
//     });
//   };

//   useEffect(() => {
//     if (state?.success) {
//       router.push("/reset-password"); // Redirect if success state is true
//     }
//   }, [state, router]);

//   return (
//     <div className="forgot-password-container">
//       <div className="forgot-main-container">
//         <h1 className="forgot-text">Forgot Password</h1>
//         <h3 className="forgot-verification">Enter Registered Email for Verification</h3>
//         <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
//           <input
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Invalid email format",
//               },
//             })}
//             className="email"
//             placeholder="Enter your email"
//           />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//           <br />
//           <button className="forgot-submit-btn">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Page;




export default function page  () {
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