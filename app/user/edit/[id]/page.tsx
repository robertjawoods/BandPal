"use server"

import prisma from "@/app/lib/prisma";
import { updateUser } from "./updateUser";
import { Influences } from "./Influences";
import { RoleSelector } from "./RoleSelector";

export default async function EditUser(props: { params: Promise<{ id: string }> }) {
    const { id: userId } = await props.params;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: {
                include: {
                    influences: true,
                    role: true
                }
            }
        }
    });

    const availableRoles = await prisma.role.findMany();

    return (
        <div className="flex flex-col gap-5">
            <h1>Edit User</h1>

            <div>
                <h2>Influences</h2>
                <Influences userId={userId} influences={user?.profile?.influences} />
            </div>

            <div>
                <form action={updateUser} className="flex flex-col gap-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" defaultValue={user?.name ?? ""} />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" placeholder="Enter your bio" defaultValue={user?.profile?.bio ?? ""} />
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" placeholder="Enter your location" defaultValue={user?.profile?.location ?? ""} />
                    <label htmlFor="role">Role</label>
                    <RoleSelector availableRoles={availableRoles} initialRoles={user?.profile?.role} />
                    <label htmlFor="image">Image</label>
                    <input title="image" type="file" name="image" accept="image/jpeg,image/png,image/gif,image/webp" />
                    <input type="hidden" name="userId" value={userId} />
                    <label htmlFor="allowMessages">Allow messages</label>
                    <input type="checkbox" name="allowMessages" defaultChecked={user?.profile?.allowMessages} />
                    <label htmlFor="lookingForBand">Looking for band</label>
                    <input type="checkbox" name="lookingForBand" defaultChecked={user?.profile?.lookingForBand} />
                    <label htmlFor="isPublic">Public profile</label>
                    <input type="checkbox" name="isPublic" defaultChecked={user?.profile?.isPublic} />
                    <button className="bg-slate-700 text-white rounded py-2 px-4">Save</button>
                </form>
            </div>
        </div>
    );
}