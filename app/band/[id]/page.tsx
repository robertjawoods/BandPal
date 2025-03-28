import prisma from "@/app/lib/prisma";
import Members from "../../components/band/Members";
import { getUser } from "@/app/lib/supabase/server";
import Link from "next/link";

/**
 * Renders a band's profile page.
 *
 * This asynchronous React component retrieves band details using the provided band id from route parameters,
 * including associated members and admin data. It then obtains the authenticated user from a Supabase client,
 * determines if the user is an admin or a member of the band, and conditionally displays controls such as an
 * "Edit Band" button for admins or an "Apply" button for non-members.
 *
 * @param props - Component props containing a promise that resolves to an object with the band id.
 * @returns The JSX markup for the band profile page, or a "Band not found" message if the band does not exist.
 */
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

  const { user } = await getUser();

  // const callback = async (item: AutocompleteItem) => {
  //   'use server'

  //   await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/band/${band.id}/member/add/${user?.id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  const isAdmin = user?.id === band.admin.id;

  const isMember = band.members.some(member => member.id === user?.id);

  return <div className="flex flex-col text-center py-4">
    <h1 className="text-3xl font-bold">{band.name}</h1>
    <div className="flex">
      <div className="px-3 py-3">
        <div className="flex mx-auto flex-col gap-3">
          {/* {session && session.user && <UserSearch submitCallback={callback} />} */}
        </div>

      </div>

      {isAdmin &&
        <Link href={`/band/edit/${band.id}`}>
          <button className="bg-slate-700 text-white rounded py-2 px-4">Edit Band</button>
        </Link>
      }

      {!isMember && band.lookingForMembers &&
        <Link href={`/band/${band.id}/join`}>
          <button className="bg-slate-700 text-white rounded py-2 px-4">Apply</button>
        </Link>
      }

      <div className="main-container flex">
        <div className="members">
          {band.showMembers || true &&
            <div className="py-5  border border-red-400 rounded mr-auto ml-4">
              <h2 className="text-lg font-semibold">Members</h2>
              <Members members={band.members} bandId={params.id} isOwner={false} />
            </div>
          }
        </div>
        <div className="information flex flex-col">
          <div>
            <h2 className="text-lg font-semibold">Genres</h2>
            <h2 className="text-2xl italic">{band.genre}</h2>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Biography</h2>
            <p>{band.bio}</p>
          </div>
        </div>

      </div>

    </div>
  </div>
}