'use server'

export async function updateUser(formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        bio: formData.get('bio') as string,
        location: formData.get('location') as string,
        userId: formData.get('userId') as string
    };
    const response = await fetch(`/api/user/${data.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        console.error('Network response was not ok', response.statusText);
    }
}