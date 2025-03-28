"use client"

import { updateAction } from "./updateUser";
import { Influences } from "@/app/components/user/Influences";
import { RoleSelector } from "@/app/components/user/RoleSelector";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo, useState } from "react";
import { UserWithProfile } from "@/app/lib/types/user";
import { Role } from "@prisma/client";
import { useUser } from "@/app/lib/hooks/useUser";
import { redirect } from "next/navigation";


export default function EditUser({ id: userId }: { id: string }) {
    const { execute, hasErrored, hasSucceeded, result } = useAction(updateAction);
    const [user, setUser] = useState<UserWithProfile>();
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

    const { user: supabaseUser, error, loading } = useUser();


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`/api/roles`);
                const data = await response.json();
                setAvailableRoles(data);
            }
            catch (err) {
                console.error("Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        if (loading || !supabaseUser || !userId) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${userId}`);
                const data = await response.json() as UserWithProfile;
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch user", err);
            }
        };

        fetchUser();
    }, [userId, supabaseUser, loading]);

    useEffect(() => {
        if (hasSucceeded) {
            redirect(`/user/${userId}`);
        }
    }, [hasSucceeded, userId]);

    const initialRoles = useMemo(() => {
        return user?.profile?.role ?? [];
    }, [user?.profile?.role]);

    return (
        <div className="flex flex-col gap-5">
            <h1>Edit User</h1>

            {loading && <div>Loading user...</div>}

            {error && <div className="text-red-500">Error: {error.message}</div>}

            {!loading && !error && (
                <>
                    <div>
                        <h2>Influences</h2>
                        <Influences userId={userId} influences={user?.profile?.influences} />
                    </div>

                    {user && (
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
                    )}

                    {hasErrored && <div className="bg-red-100 text-red-900 p-2 rounded">{result.serverError ?? result.validationErrors?._errors}</div>}
                </>
            )}
        </div>
    );
}
