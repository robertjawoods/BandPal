'use client'
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AccountProps {
  user: any;
}

export default async function Account({user}: AccountProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await fetch('/api/user/signout', {
      method: 'POST',
    });
    if (res.ok) {
      router.refresh();
    }
  }

  const displayItems = () => {
    if (!user) {
      return (<>
        <Link href="/login" className="py-5 px-3">Login</Link>
        <Link href="/login" className="py-3 px-3 rounded bg-yellow-400 text-yellow-900">Sign Up</Link>
      </>)
    }
    return (<>
      <Link href="#" onClick={() => handleSignOut()} className="py-3 px-3">Logout</Link>
      <Link href={`/user/${user?.id || ''}`} className="py-3 px-3">Account</Link>
    </>)
  }

  return (
    <div className="flex space-x-3 items-center">
      {displayItems()}
    </div>
  );
} 