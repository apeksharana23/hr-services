import React from "react";
import SignInTraineesPage from "./components/sign-in";

export default function SignInTrainees() {
  return (
    <div className="items-center flex justify-center py-5">
      <div className="screen-xl bg-white  flex justify-center flex-1">
        <div className="flex-1 bg-white-900 text-center hidden md:flex">
          <div
            className="m-10 xl:m-16 w-full h-full bg-[url('@/app/img/trainee-login1.jpg')] bg-contain bg-center bg-no-repeat object-contain"
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-color mt-4">
                Sign In Here...
              </h1>
            </div>
            <SignInTraineesPage/>
          </div>
        </div>
      </div>
    </div>
  );
}