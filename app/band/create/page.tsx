"use client"

import { useUser } from "@/app/lib/hooks/useUser";
import { createBand } from "./createBand";

export default function CreateBandPage() {

    const { user, error } = useUser();

    if (error) {
        return <div>{error.message}</div>
    }

    return <>
        <form action={(formData) => createBand(formData, user)}>
            <label htmlFor="name">Band Name:</label>
            <input type="text" name="name" title="Name" />
            <input type="submit" value="Create" />
        </form>
    </>
}