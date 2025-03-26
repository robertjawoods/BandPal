"use client"

import { updateAction } from "./updateUser";
import { Influences } from "@/app/components/user/Influences";
import { RoleSelector } from "@/app/components/user/RoleSelector";
import { useAction } from "next-safe-action/hooks";
import { use, useEffect, useMemo, useState } from "react";
import { UserWithProfile } from "@/app/lib/types/user";
import { Role } from "@prisma/client";

export default function EditUser(props: { params: Promise<{ id: string }> }) {
    const { execute, hasErrored, hasSucceeded, status, result, input } = useAction(updateAction);
    const { id: userId } = use(props.params);
    const [user, setUser] = useState<UserWithProfile>();
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchUser = async () => {
            const response = await fetch(`/api/user/${userId}`);
            const data = await response.json() as UserWithProfile;

            setUser(data);

            console.log(data);
        };

        fetchUser();
    }, [userId]);

    // Inside the EditUser component:
    const initialRoles = useMemo(() => {
        return user?.profile?.role ?? [];
    }, [user?.profile?.role]);

    useEffect(() => {
        console.log({ hasErrored, hasSucceeded, status, result, input: JSON.stringify(input) });
    }, [hasErrored, hasSucceeded, status, result, input]);


    useEffect(() => {
        const fetchRoles = async () => {
            const response = await fetch(`/api/roles`);
            const data = await response.json();

            setAvailableRoles(data);
        };

        fetchRoles();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1>Edit User</h1>

            <div>
                <h2>Influences</h2>
                <Influences userId={userId} influences={user?.profile?.influences} />
            </div>

            {user && <div>
                <form className="flex flex-col gap-3" action={execute}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" defaultValue={user?.name ?? ""} />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" placeholder="Enter your bio" defaultValue={user?.profile?.bio ?? ""} />
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" placeholder="Enter your location" defaultValue={user?.profile?.location ?? ""} />
                    <label htmlFor="role">Role</label>
                    <RoleSelector availableRoles={availableRoles} initialRoles={initialRoles} />
                    <label htmlFor="image">Image</label>
                    <input title="image" type="file" name="image" accept="image/*" />
                    <input type="hidden" name="userId" value={userId} />
                    <label htmlFor="allowMessages">Allow messages</label>
                    <input type="checkbox" name="allowMessages" checked={user?.profile?.allowMessages} onChange={() => { }} />
                    <label htmlFor="lookingForBand">Looking for band</label>
                    <input type="checkbox" name="lookingForBand" checked={user?.profile?.lookingForBand} onChange={() => { }} />
                    <label htmlFor="isPublic">Public profile</label>
                    <input type="checkbox" name="isPublic" checked={user?.profile?.isPublic} onChange={() => { }} />
                    <button className="bg-slate-700 text-white rounded py-2 px-4" type="submit">Save</button>
                </form>
            </div>}
        </div>
    );
}