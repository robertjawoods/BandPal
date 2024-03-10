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


  return <div>
    <p>{band.name}</p>
    <div>
      {session && session.user && <AddMember bandId={params.id} />}
      <p>Members</p>
      <Members members={band.members} bandId={params.id} />
    </div>
  </div>
}