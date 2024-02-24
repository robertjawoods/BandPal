import prisma from "@/app/lib/prisma";

export default async function Page({ params }: { params: { id: string } }) {

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

  console.log(band);

  return <div>
    <p>{band.name}</p>
    <div>
      <p>Members</p>
      {band.members.map(m => {
        return <div key={m.id}>{m.name}</div>
    })}</div>
  </div>
}