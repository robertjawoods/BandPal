"use client"

import { useUser } from "@/app/lib/hooks/useUser";

// import { object, string } from 'yup';

// let bandSchema = object({
//     name: string().required(),

import { submit } from "./createBand";

export default function CreateBandPage() {

    const { user, error } = useUser();

    if (error) {
        return <div>{error.message}</div>
    }

    return <>
        <form action={(formData) => submit(formData, user)}>
            <label htmlFor="name">Band Name:</label>
            <input type="text" name="name" title="Name" />
            <input type="submit" value="Create" />
        </form>
    </>
}