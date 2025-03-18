import prisma from "@/app/lib/prisma";
import Members from "./Members";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const band = await prisma.band.findFirst({
    where: {
      id: params.id
    },
    include: {
      members: true,
      admin: true
    },
  });

  console.log(band);

  if (!band) {
    return <div>Band not found</div>
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // const callback = async (item: AutocompleteItem) => {
  //   'use server'

  //   await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/band/${band.id}/add-member`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId: item.objectID }),
  //   });
  // }

  const isAdmin = user?.id === band.admin.id;

  const isMember = band.members.some(member => member.id === user?.id);

  return <div className="flex flex-col text-center py-4">
    <h1 className="text-3xl font-bold">{band.name}</h1>
    <div className="flex ">
      <div className="px-3 py-3">
        <div className="flex mx-auto flex-col gap-3">
          {/* {session && session.user && <UserSearch submitCallback={callback} />} */}
        </div>
        <div className="py-5  border border-red-400 rounded mr-auto ml-4">
          <h2 className="text-lg font-semibold">Members</h2>
          <Members members={band.members} bandId={params.id} isOwner={false} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl italic">{band.genre}</h2>
        <p>{band.bio}</p>
        {isAdmin && 
          <Link href={`/band/edit/${band.id}`}>
            <button className="bg-slate-700 text-white rounded py-2 px-4">Edit Band</button>
          </Link>
        }
        {!isMember &&
          <Link href={`/band/${band.id}/join`}>
            <button className="bg-slate-700 text-white rounded py-2 px-4">Apply</button>
          </Link>
        }
      </div>
    </div>
  </div>
}