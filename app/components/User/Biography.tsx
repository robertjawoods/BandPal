'use client'

import { FormEvent, useState } from "react";

export default function Biography({ bio }: { bio: string | null | undefined}) {
    const [isEditing, setIsEditing] = useState(false);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newBio = formData.get('bio') as string;
        
        await fetch('/api/user/bio', { 
            method: 'POST',
            body: JSON.stringify({ bio: newBio }),
            
        });

        setIsEditing(false);
    };

    const editForm = (
        <form onSubmit={e => submit(e)}>
            <textarea autoFocus>{bio}</textarea>
            <button type="submit">Save</button>
        </form>
    );

    return (
        <div onClick={() => {
            setIsEditing(val => !val);
        }}>
            <h2>Bio</h2>
            {isEditing ? editForm : <p>{bio}</p>}
        </div>
    );
}