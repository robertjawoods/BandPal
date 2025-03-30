"use client"

import { useUser } from "@/app/lib/hooks/useUser";
import { createBandAction } from "./createBand";
import { useAction } from "next-safe-action/hooks";

export default function CreateBandPage() {
    const { execute, hasErrored } = useAction(createBandAction);

    const { user, error } = useUser();

    if (error) {
        return <div>{error.message}</div>
    }

    return <>
        <form action={execute}>
            <label htmlFor="name">Band Name:</label>
            <input type="text" name="name" title="Name" />
            {/* should probably get the user id on the server side */}
            <input type="hidden" name="userId" value={user?.id} />
            <input type="submit" value="Create" />
        </form>
        { hasErrored && <div>There was an error creating the band.</div> }
    </>
}