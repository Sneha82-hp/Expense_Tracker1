import SignUpForm from "./_component/signup-form";
import Logo from "@/components/logo/logo";

const SignUp = () => {
  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/photo.png')`, // from public folder
      }}
    >

      {/* Centered Logo at Top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 scale-125">
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
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;


// import React, { useState } from "react";

// const SignUpPage: React.FC = () => {
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
//         className="w-[45%] bg-[#f7f7f7] rounded-tl-[3rem] flex flex-col justify-center items-start"
//         style={{ minHeight: "100vh" }}
//       >
//         <form className="w-full max-w-md mx-auto px-6 pt-12 pb-8">
//           <h2
//             className="font-black text-3xl mb-12 mt-2"
//             style={{ fontFamily: "Poppins, sans-serif" }}
//           >
//             Create Account
//           </h2>

//           <div className="mb-8">
//             <input
//               name="name"
//               type="text"
//               placeholder="Name"
//               className="w-full mb-6 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//             />

//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="w-full mb-6 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//             />

//             {/* PASSWORD FIELD + TOGGLE */}
//             <div className="relative">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-600 transition text-lg"
//               />

//               {/* Eye Icon Toggle */}
//               <span
//                 className="absolute right-2 top-2.5 opacity-60 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   // Eye (password visible)
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
//                   // Eye-off (password hidden)
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

//           <button
//             type="submit"
//             className="w-full py-3 rounded-md bg-[#70d6de] text-white font-bold text-lg"
//           >
//             Sign up
//           </button>

//           <div className="pt-4 text-xs text-gray-400 mt-5">
//             Already have an account?{" "}
//             <a href="/login" className="text-[#70d6de]">
//               Log in
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
