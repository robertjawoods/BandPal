'use client'

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import notLoggedIn from '../../public/not-logged-in.svg';
import Envelope from "./Envelope"
import { NavLogo } from "./NavLogo";
import Account from "./AccountComponent";
import { NavigationLinks } from "./NavigationLinks";

export default function Navbar() {
  const { data } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
     <nav data-testid="nav" className="bg-gray-200">
      <div data-testid="nav-container" className="max-w-7xl mx-auto border">
        <div data-testid="nav-items" className="flex justify-between">
          <NavLogo />
          <NavigationLinks />
          <Account />
        </div>
      </div>
    </nav>
  );
}

   // <>
    //   <nav className="bg-gray-800">
    //     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    //       <div className="relative flex h-16 items-center justify-between">
    //         <div className="flex justify-between w-full">
    //           <div className="flex items-center">
    //             <div className="hidden sm:ml-6 sm:block">
    //               <div className="flex space-x-4">
    //                 <Link href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
    //                 <Link href="/bands" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Bands</Link>
    //                 <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Users</Link>
    //                 <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</Link>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-center justify-">
    //             <div>
    //               <Envelope />
    //             </div>

    //             <div className="">
    //               <button onClick={() => setMenuOpen(o => !o)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
    //                 <span className="absolute -inset-1.5"></span>
    //                 <span className="sr-only">Open user menu</span>
    //                 <Image className="h-8 w-8 rounded-full" src={data?.user?.image ?? notLoggedIn} alt="" />
    //               </button>
    //             </div>

    //             <div className={`${menuOpen ? '' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
    //               <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile</a>
    //               <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</a>
    //               {data ? <a href="#" onClick={() => signIn()}>Sign In</a> : <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" onClick={() => signOut()}>Sign out</a>}
    //             </div>
    //           </div>

    //         </div>
    //       </div>
    //     </div>

    //     <div className="sm:hidden" id="mobile-menu">
    //       <div className="space-y-1 px-2 pb-3 pt-2">
    //         <Link href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
    //         <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Bands</Link>
    //       </div>
    //     </div>
    //   </nav>
    // </>
