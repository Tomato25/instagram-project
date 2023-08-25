'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

const SignInBtn = ({ name }) => {

  return (
    <>
    <div
      onClick={() => signIn(name.toLowerCase(), {callbackUrl: "/"})}
      className="bg-blue-500 flex items-center gap-4 shadow-xl rounded-lg pl-3 cursor-pointer"
    >
      <span className=" text-white px-4 py-3 w-full">
        Sign in with {name}
      </span>
    </div>
    </>
  );
};

export default SignInBtn;