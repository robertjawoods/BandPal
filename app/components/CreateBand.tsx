import Link from "next/link";
import { auth } from "../auth";

export default async function CreateBand() {
  const session = await auth();

  if (!session || !session.user) {
    return <></>
  }

  return <>
    <Link href={'/band/create'}>Create Band</Link>
  </>
}