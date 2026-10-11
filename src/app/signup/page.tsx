"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
export default function SignUpDesign() {

const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
 const formData=new FormData(e.target)
const user=Object.fromEntries(formData.entries()) as {name:string,email:string,password:string}
  const { data, error } = await authClient.signUp.email({
    ...user,
    callbackURL: "/",
  });

  if (error) {
    console.error(error);
    return;
  }
if(data){
  console.log(data);
  redirect("/");
};
}

  return (
    <div className="min-h-screen bg-[#f5f7f5] flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs text-gray-500 mt-2 max-w-sm">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              নাম
            </label>
            <input name="name"
              type="text"
              placeholder="Hadiuzzaman Rizvy"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0f8a42] focus:bg-white transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input name="mail"
              type="email"
              placeholder="hadiuzzamanrizvy@gmail.com"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0f8a42] focus:bg-white transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0f8a42] focus:bg-white transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input name=" confirmpassword"
              type="password"
              placeholder="আবার লিখুন"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0f8a42] focus:bg-white transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#0f8a42] hover:bg-[#0c7337] text-white font-bold py-3.5 rounded-xl shadow-sm hover:shadow transition-all text-sm mt-2 cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-100 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-400 absolute">
            অথবা
          </span>
        </div>

        {/* Social Options */}
        <div className="grid grid-cols-2 gap-3">
          <button className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

        <button className="btn bg-black text-white border-black">
  <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
  Login with GitHub
</button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500 pt-2">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="text-[#0f8a42] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Return Link */}
      <Link
        href="/"
        className="text-xs text-gray-500 hover:text-gray-800 transition-colors mt-6 flex items-center gap-1 font-medium"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}