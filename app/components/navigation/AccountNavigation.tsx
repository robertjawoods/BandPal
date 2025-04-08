'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AccountProps {
  user: any;
}

export default function Account({ user }: AccountProps) {
  const router = useRouter();

  const handleSignOut = () => {
    fetch('/api/user/signout', {
      method: 'POST',
    }).then(res => {
      if (res.ok) {
        router.refresh();
      }
    });

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