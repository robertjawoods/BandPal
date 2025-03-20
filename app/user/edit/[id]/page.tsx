"use server"

import prisma from "@/app/lib/prisma";
import { updateUser } from "./updateUser";
import { Influences } from "./Influences";

export default async function EditUser(props: { params: Promise<{ id: string }> }) {
    const { id: userId } = await props.params;

    console.log('userId', userId);

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: {
                include: {
                    influences: true
                }
            }
        }
    });

    return (
        <div>
            <h1>Edit User</h1>

            <div>
                <Influences userId={userId} influences={user?.profile?.influences} />
            </div>

            <div>
                <form action={updateUser}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" defaultValue={user?.name ?? ""} />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" placeholder="Enter your bio" defaultValue={user?.profile?.bio ?? ""} />
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" placeholder="Enter your location" defaultValue={user?.profile?.location ?? ""} />
                    <button>Save</button>
                </form>
            </div>
        </div>
    );
}