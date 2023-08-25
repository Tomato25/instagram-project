'use client';

import React, { use } from 'react';
import { getProviders } from 'next-auth/react';
import SignInBtn from '../components/SignInBtn';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


async function getData() {
  const providers = await getProviders();


  return providers;
}

export default function SignIn() {
  const providers = use(getData());
  const router = useRouter()

const [counter, setCounter] = useState(0)



  return (
    <>
      {Object.values(providers).map(provider => {
        return <SignInBtn name={provider.name} key={provider.id} />
        ;
      })}
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </>
  );
}
