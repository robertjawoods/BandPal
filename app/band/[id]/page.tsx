import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import AddMember from "./AddMember";
import Members from "./Members";

export default async function Page({ params }: { params: { id: string } }) {

  const session = await auth();


  const band = await prisma.band.findFirst({
    where: {
      id: params.id
    },
    include: {
      members: true
    }
  });

  if (!band) {
    return <div>Band not found</div>
  }


  return <div className="flex flex-col text-center py-4">
    <h1 className="text-3xl font-bold">{band.name}</h1>
    <div>
      <h2 className="text-2xl italic">{band.genre}</h2>
      <p>{band.bio}</p>
    </div>
    <div className="flex flex-col border border-red-400 rounded mr-auto ml-4">
      <div className="px-3 py-3">
        <div className="flex mx-auto flex-col gap-3">
          {session && session.user && <AddMember bandId={params.id} />}
        </div>
        <div className="py-5 ">
          <h2 className="text-lg font-semibold">Members</h2>
          <Members members={band.members} bandId={params.id} />
        </div>
      </div>
    </div>
  </div>

}