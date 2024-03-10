import Link from "next/link";
import AccountComponent from "./AccountComponent";

export default async function Navbar() {

  return <>
    <Link href={'/'}>Home</Link>
    <Link href={'/users'}>Users</Link>
    <Link href={'/bands'}>Bands</Link>
    <AccountComponent />
  </>
}