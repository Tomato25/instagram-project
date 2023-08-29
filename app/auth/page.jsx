import React, { use } from "react";
import { getProviders } from "next-auth/react";
import SignInBtn from "../components/SignInBtn";
import Image from "next/image";
import Logo from "../../public/logo.png";

async function getData() {
  const providers = await getProviders();

  return providers;
}

export default function SignIn() {
  const providers = use(getData());

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
      <Image
            src={Logo}
            alt="Instagram logo"
            objectFit="contain"
            className="w-80"
          />
        <div className="mt-40">
          {Object.values(providers).map((provider) => {
            return <SignInBtn name={provider.name} key={provider.id} />;
          })}
        </div>
      </div>
    </>
  );
}