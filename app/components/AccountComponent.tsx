'use client';

// import { Session } from "next-auth";
import { signIn, signOut, useSession, } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Account() {
  const { data } = useSession();

  console.log(data);
  
  const displayItems = () => {
    if (!data) {
      return (<>
        <Link href="#" onClick={() => signIn()} className="py-5 px-3">Login</Link>
        <Link href='#' onClick={() => signIn()} className="py-3 px-3 rounded bg-yellow-400 text-yellow-900">Sign Up</Link>
      </>)
    }
    return (<>
      <Link href="#" onClick={() => signOut()} className="py-3 px-3">Logout</Link>
      <Link href={`/user/${data.user?.id || ''}`} className="py-3 px-3">Account</Link>
    </>)
  }

  return (
    <div className="flex space-x-3 items-center">
      {displayItems()}
    </div>
  );
}