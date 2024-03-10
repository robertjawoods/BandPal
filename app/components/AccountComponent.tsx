'use client';

// import { Session } from "next-auth";
import { signIn, signOut, useSession,} from "next-auth/react";

export default function Account() {
     const {data} = useSession();
    return (
     // <></>
      <main>  
        {
          data?.user ? <h1>Logged in as {data.user?.name}</h1> : <h1>Not logged in</h1>
        }

        {data ? <button onClick={() => signOut()}>Sign Out</button> :  <button onClick={() => signIn()}>Sign In</button>}
      </main>
    );
  }