import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import { editBand } from "./editBand";

/**
 * Renders a page for editing a band's details.
 *
 * This async component retrieves the band using its id (provided via a promise in the props) and
 * verifies that the current authenticated user is the band's admin. If the band is not found,
 * it displays a "Band not found" message; if the user is not the admin, it redirects to the home page.
 * Otherwise, it renders a form pre-filled with the band's details for editing.
 *
 * @param props - An object containing a promise that resolves to an object with the band's id.
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

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // const callback = async (item: AutocompleteItem) => {
    //     'use server'

    //     await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/band/${band.id}/member/add/${user?.id}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ userId: item.objectID }),
    //     });
    // }

    const isAdmin = user?.id === band.admin.id;

    if (!isAdmin) {
        redirect('/')
    }

    return <div>
        <h1>Editing {band.name}</h1>
        <form className="flex flex-col" action={editBand}>
            <label htmlFor="name">Band Name:</label>
            <input type="text" name="name" title="Name" defaultValue={band.name}/>
            <label htmlFor="genre">Genre:</label>
            <input type="text" name="genre" title="Genre" defaultValue={band.genre ?? ""}/>
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" title="Bio" defaultValue={band.bio ?? ""}></textarea>
            <label htmlFor="members">Members:</label>
            <label htmlFor="lookingForMembers">Looking for members:</label>
            <input type="checkbox" name="lookingForMembers" title="Looking for members" defaultChecked={band.lookingForMembers}/>
            <input type="hidden" name="id" value={band.id}/>
            <input type="submit" value="Save" />
        </form>
    </div>
}