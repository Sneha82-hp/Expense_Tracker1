import SignInForm from "./_component/signin-form";
import Logo from "@/components/logo/logo";

const SignIn = () => {
  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/photo.png')`,
      }}
    >

      {/* Centered Logo at Top */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 scale-125">
        <Logo url="/" />
      </div>

      {/* Centered Form Container */}
      <div className="flex items-center justify-center h-screen px-4">
        <div
          className="
            w-full max-w-sm 
            bg-white/70 dark:bg-black/40
            backdrop-blur-md 
            rounded-2xl 
            shadow-2xl 
            p-8
            border border-white/30
          "
        >
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;




      {/* RIGHT SECTION (currently disabled) */}
      {/*
      <div className="relative hidden bg-muted lg:block -mt-3">
        <div className="absolute inset-0 flex flex-col items-end justify-end pt-8 pl-8">
          <div className="w-full max-w-3xl mx-0 pr-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hi, I'm your AI-powered personal finance app, Expenza!
            </h1>
            <p className="mt-4 text-gray-600 dark:text-muted-foreground">
              Expenza provides insights, monthly reports, CSV import, recurring transactions,
              all powered by advanced AI technology. 🚀
            </p>
          </div>

          <div className="relative max-w-3xl h-full w-full overflow-hidden mt-3">
            <img
              src={theme === "dark" ? dashboardImgDark : dashboardImg}
              alt="Dashboard"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                objectPosition: "left top",
                transform: "scale(1.2)",
                transformOrigin: "left top",
              }}
            />
          </div>
        </div>
      </div>
      */}


// SignIn Page — Redesigned Like Screenshot (Cyan gradient + 3D Illustration)
// SignUpPage.tsx
// import React from "react";

// // Replace this import with your own image import if using next/image or similar
// const illustrationUrl = "/illustration.png"; // place the image in your /public folder

// const SignUpPage: React.FC = () => (
//   <div className="min-h-screen flex">
//     {/* LEFT SIDE - Illustration */}
//     <div className="w-[55%] bg-[#bfe3eb] relative flex flex-col justify-center items-center overflow-hidden">
//       <img
//         src={illustrationUrl}
//         alt="3D Illustration"
//         className="w-[510px] h-[510px] object-contain absolute left-[10%] top-1/2 -translate-y-1/2"
//         style={{ zIndex: 2 }}
//       />
//     </div>

//     {/* RIGHT SIDE - Form */}
//     <div className="w-[45%] bg-[#f7f7f7] rounded-tl-[3rem] flex flex-col justify-center items-start" style={{ minHeight: "100vh" }}>
//       <form className="w-full max-w-md mx-auto px-6 pt-12 pb-8">
//         <h2 className="font-black text-3xl mb-12 mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//           Create Account
//         </h2>
//         <div className="mb-8">
//           <input
//             name="name"
//             type="text"
//             placeholder="Name"
//             className="w-full mb-6 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="w-full mb-6 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//           />
//           <div className="relative">
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="w-full border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//             />
//             <span className="absolute right-2 top-2.5 opacity-50 cursor-pointer">
//               {/* Eye-off icon (SVG) */}
//               <svg width="24" height="24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17.94 17.94A10.45 10.45 0 0112 19C7.05 19 3 14.5 3 12c.18-.5 1.24-2.76 3.34-4.49" />
//                 <path d="M1 1l22 22" />
//               </svg>
//             </span>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 rounded-md bg-[#70d6de] text-white font-bold text-lg"
//         >
//           Sign up
//         </button>
//         <div className="pt-4 text-xs text-gray-400 mt-5">
//           Already have an account? <a href="/login" className="text-[#70d6de]">Log in</a>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// export default SignUpPage;






// import React, { useState } from "react";

// const SignInPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT SIDE - Illustration */}
//       <div className="w-[55%] bg-[#bfe3eb] relative flex flex-col justify-center items-center overflow-hidden">
//         <img
//           src="/illustration.png"
//           alt="3D Illustration"
//           className="w-[510px] h-[510px] object-contain absolute left-[10%] top-1/2 -translate-y-1/2"
//           style={{ zIndex: 2 }}
//         />
//       </div>

//       {/* RIGHT SIDE - Form */}
//       <div
//         className="w-[45%] bg-[#f7f7f7] rounded-tl-[3rem] flex flex-col justify-center"
//         style={{ minHeight: "100vh" }}
//       >
//         <form className="w-full max-w-md mx-auto px-6 pt-12 pb-8">
//           <h2
//             className="font-black text-3xl mb-12 mt-2"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             Welcome Back
//           </h2>

//           <div className="mb-8">
//             {/* NAME */}
//             <input
//               name="name"
//               type="text"
//               placeholder="Name"
//               className="w-full mb-6 border-0 border-b border-gray-300 bg-transparent 
//                          focus:outline-none focus:border-gray-600 transition text-lg"
//             />

//             {/* PASSWORD */}
//             <div className="relative">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full border-0 border-b border-gray-300 bg-transparent 
//                            focus:outline-none focus:border-gray-600 transition text-lg"
//               />

//               {/* Toggle Password */}
//               <span
//                 className="absolute right-2 top-2.5 opacity-60 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   // eye (visible)
//                   <svg
//                     width="24"
//                     height="24"
//                     fill="none"
//                     stroke="gray"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
//                     <circle cx="12" cy="12" r="3" />
//                   </svg>
//                 ) : (
//                   // eye-off (hidden)
//                   <svg
//                     width="24"
//                     height="24"
//                     fill="none"
//                     stroke="gray"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M17.94 17.94A10.45 10.45 0 0112 19C7.05 19 3 14.5 3 12c.18-.5 1.24-2.76 3.34-4.49" />
//                     <path d="M1 1l22 22" />
//                   </svg>
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-md bg-[#70d6de] text-white font-bold text-lg"
//           >
//             Sign in
//           </button>

//           <div className="pt-4 text-xs text-gray-400 mt-5">
//             Don’t have an account?{" "}
//             <a href="/sign-up" className="text-[#70d6de]">
//               Create one
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
