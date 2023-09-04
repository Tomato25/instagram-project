import React, { use } from "react";
import { getProviders } from "next-auth/react";
import SignInBtn from "../components/SignInBtn";
import Image from "next/image";
import Logo from "../../public/logo.png";

async function getData() {
  const providers = await getProviders();
  console.log(providers)
  return providers;
}

export default function SignIn() {
  const providers = use(getData());
  console.log(providers)

  console.log(providers)
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen py-2 -pt-56 px-14 text-center overflow-hidden">
      <Image
            src={Logo}
            alt="Instagram logo"
            objectFit="contain"
            className="w-80"
          />
        <h2>This website is for educational purposes only </h2>
        <div className="mt-40">
          {providers && Object.values(providers).map((provider) => {
            return <SignInBtn name={provider.name} key={provider.id} />;
          })}
        </div>
      </div>
    </>
  );
}
